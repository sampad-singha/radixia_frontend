import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Users, ArrowRight } from "lucide-react"
import { useParams } from "react-router-dom"
import { useProgramCohorts } from "@/queries/program.queries"
import {Skeleton} from "@/components/ui/skeleton.tsx";

type Cohort = {
    id: string
    name: string
    startDate: string
    endDate?: string
    enrollDeadline?: string
    schedule: string | null
    instructor: string
    price: number
    originalPrice: number | null
    seats: number
    seatsLeft: number
    status: "open" | "ended"
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

function SeatsPip({ seats, seatsLeft }: { seats: number; seatsLeft: number }) {
    const filled = seats - seatsLeft
    const total = Math.min(seats, 10)
    const filledCount = Math.round((filled / seats) * total)
    const almostFull = seatsLeft <= 8 && seatsLeft > 0

    return (
        <div className="flex items-center gap-1.5 mt-4">
            <div className="flex gap-0.5">
                {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5  transition-colors ${
                            i < filledCount
                                ? "bg-green-600"
                                : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
            <span className={`text-xs ms-2 ${almostFull ? "text-destructive font-medium" : "text-foreground"}`}>
                {seatsLeft === seats
                    ? `${seats} spots`
                    : almostFull
                        ? `${seatsLeft} left`
                        : `${seatsLeft} out of ${seats} seats available.`}
            </span>
        </div>
    )
}

export default function ProgramCohorts() {
    const { slug } = useParams()
    const { data, isLoading, isError } = useProgramCohorts(slug)
    const cohorts: Cohort[] = data ?? []

    if (isLoading) {
        return (
            <div className="space-y-10">

                {/* Open cohorts */}
                <section className="space-y-3">
                    <Skeleton className="h-3 w-32" />

                    <div className="divide-y border rounded-xl overflow-hidden">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div
                                key={i}
                                className="p-5 flex flex-col sm:flex-row sm:items-start gap-5"
                            >
                                {/* Left */}
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-4 w-48" />

                                    <div className="flex flex-wrap gap-3">
                                        <Skeleton className="h-3 w-28" />
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>

                                    {/* Seats pip */}
                                    <div className="flex items-center gap-2 mt-2">
                                        {Array.from({ length: 10 }).map((_, j) => (
                                            <Skeleton key={j} className="w-1.5 h-1.5 rounded" />
                                        ))}
                                        <Skeleton className="h-3 w-24 ml-2" />
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                                    <div className="space-y-1 text-right">
                                        <Skeleton className="h-4 w-16 ml-auto" />
                                        <Skeleton className="h-3 w-12 ml-auto" />
                                    </div>

                                    <Skeleton className="h-8 w-28" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Skeleton className="h-3 w-64" />
                </section>

                {/* Past cohorts */}
                <section className="space-y-3">
                    <Skeleton className="h-3 w-28" />

                    <div className="divide-y border rounded-xl overflow-hidden">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="px-5 py-3.5 flex items-center gap-6"
                            >
                                <Skeleton className="h-3 w-32" />
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        )
    }

    if (isError) {
        return (
            <div className="py-8 text-sm text-destructive">
                Failed to load cohorts.
            </div>
        )
    }

    if (!cohorts.length) {
        return (
            <div className="py-8 text-sm text-muted-foreground">
                No cohorts available yet.
            </div>
        )
    }

    const openCohorts = cohorts.filter((c) => c.status === "open")
    const pastCohorts = cohorts.filter((c) => c.status === "ended")

    return (
        <div className="space-y-10">

            {/* Open cohorts */}
            {openCohorts.length > 0 && (
                <section className="space-y-3">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        Enrolling Now
                    </h2>

                    <div className="divide-y border rounded-xl overflow-hidden">
                        {openCohorts.map((cohort) => {
                            const discount =
                                cohort.originalPrice &&
                                cohort.originalPrice > cohort.price
                                    ? Math.round(
                                        ((cohort.originalPrice - cohort.price) /
                                            cohort.originalPrice) *
                                        100
                                    )
                                    : null

                            return (
                                <div
                                    key={cohort.id}
                                    className="p-5 flex flex-col sm:flex-row sm:items-start gap-5"
                                >
                                    {/* Left: info */}
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-base leading-snug">
                                                {cohort.name}
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                                                {formatDate(cohort.startDate)}
                                                {cohort.endDate && (
                                                    <span>
                                                        {" "}— {formatDate(cohort.endDate)}
                                                    </span>
                                                )}
                                            </span>

                                            {cohort.schedule && (
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 shrink-0" />
                                                    {cohort.schedule}
                                                </span>
                                            )}

                                            <span className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 shrink-0" />
                                                {cohort.instructor}
                                            </span>
                                        </div>

                                        <SeatsPip
                                            seats={cohort.seats}
                                            seatsLeft={cohort.seatsLeft}
                                        />
                                    </div>

                                    {/* Right: price + CTA */}
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                                        <div className="text-right">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-bold">
                                                    BDT {cohort.price}
                                                </span>
                                                {discount && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-[10px] px-1.5 py-0"
                                                    >
                                                        -{discount}%
                                                    </Badge>
                                                )}
                                            </div>
                                            {cohort.originalPrice &&
                                                cohort.originalPrice > cohort.price && (
                                                    <p className="text-xs text-muted-foreground line-through">
                                                        BDT {cohort.originalPrice}
                                                    </p>
                                                )}
                                        </div>

                                        <div className="space-y-4 text-right">
                                            <Button size="sm" className="gap-1.5">
                                                Enroll Now
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Button>
                                            {cohort.enrollDeadline && (
                                                <p className="text-[11px] text-muted-foreground">
                                                    Deadline{" "}
                                                    <span className="font-medium text-foreground">
                                                        {formatDate(cohort.enrollDeadline)}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-xs text-muted-foreground px-0.5">
                        Payment plans available · 7-day money-back guarantee
                    </p>
                </section>
            )}

            {/* Past cohorts */}
            {pastCohorts.length > 0 && (
                <section className="space-y-3">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        Past Cohorts
                    </h2>

                    <div className="divide-y border rounded-xl overflow-hidden">
                        {pastCohorts.map((cohort) => (
                            <div
                                key={cohort.id}
                                className="px-5 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-1 opacity-60"
                            >
                                <span className="text-sm font-medium">
                                    {cohort.name}
                                </span>

                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <CalendarDays className="w-3 h-3 shrink-0" />
                                    {formatDate(cohort.startDate)}
                                    {cohort.endDate && (
                                        <span>— {formatDate(cohort.endDate)}</span>
                                    )}
                                </span>

                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Users className="w-3 h-3 shrink-0" />
                                    {cohort.instructor}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}