import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, Wifi, Users, MapPin, CheckCircle2 } from "lucide-react"

interface Cohort {
    id: number
    name: string
    startDate: string
    endDate: string
    enrollDeadline: string
    format: "Live Online" | "Self-Paced" | "Hybrid"
    seats: number
    seatsLeft: number
    schedule: string
    timezone: string
    instructor: string
    price: number
    originalPrice: number
    status: "open" | "filling" | "closed" | "upcoming"
    highlights: string[]
}

const cohorts: Cohort[] = [
    {
        id: 1,
        name: "Cohort 7 — April 2025",
        startDate: "April 7, 2025",
        endDate: "May 30, 2025",
        enrollDeadline: "March 31, 2025",
        format: "Live Online",
        seats: 30,
        seatsLeft: 6,
        schedule: "Mon & Wed, 8:00 PM – 10:00 PM",
        timezone: "BST (GMT+6)",
        instructor: "Mehedi Hasan",
        price: 300,
        originalPrice: 450,
        status: "filling",
        highlights: [
            "2 live sessions per week with Q&A",
            "Private Discord community access",
            "1-on-1 code review (2 sessions)",
            "Certificate of completion",
        ],
    },
    {
        id: 2,
        name: "Cohort 8 — June 2025",
        startDate: "June 2, 2025",
        endDate: "July 25, 2025",
        enrollDeadline: "May 26, 2025",
        format: "Live Online",
        seats: 30,
        seatsLeft: 30,
        schedule: "Tue & Thu, 8:00 PM – 10:00 PM",
        timezone: "BST (GMT+6)",
        instructor: "Mehedi Hasan",
        price: 300,
        originalPrice: 450,
        status: "upcoming",
        highlights: [
            "2 live sessions per week with Q&A",
            "Private Discord community access",
            "1-on-1 code review (2 sessions)",
            "Certificate of completion",
        ],
    },
    {
        id: 3,
        name: "Self-Paced — Anytime",
        startDate: "Immediate access",
        endDate: "Lifetime",
        enrollDeadline: "No deadline",
        format: "Self-Paced",
        seats: 999,
        seatsLeft: 999,
        schedule: "Learn on your own schedule",
        timezone: "Any",
        instructor: "Mehedi Hasan (pre-recorded)",
        price: 199,
        originalPrice: 300,
        status: "open",
        highlights: [
            "Full video curriculum access",
            "Community forum access",
            "All future content updates",
            "Certificate of completion",
        ],
    },
]

const statusConfig: Record<Cohort["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    open: { label: "Open", variant: "default" },
    filling: { label: "Filling Fast", variant: "destructive" },
    closed: { label: "Closed", variant: "secondary" },
    upcoming: { label: "Coming Soon", variant: "outline" },
}

const formatIcon: Record<Cohort["format"], React.ElementType> = {
    "Live Online": Wifi,
    "Self-Paced": Clock,
    "Hybrid": MapPin,
}

export default function ProgramCohorts() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Available Cohorts</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Choose between live, instructor-led cohorts or a self-paced format. All options include the same core curriculum.
                </p>
            </div>

            <div className="space-y-4">
                {cohorts.map((cohort) => {
                    const seatsUsed = cohort.seats - cohort.seatsLeft
                    const seatPercent = (seatsUsed / cohort.seats) * 100
                    const FormatIcon = formatIcon[cohort.format]
                    const statusCfg = statusConfig[cohort.status]
                    const isClosed = cohort.status === "closed"
                    const isUpcoming = cohort.status === "upcoming"
                    const isSelfPaced = cohort.format === "Self-Paced"

                    return (
                        <Card key={cohort.id} className="overflow-hidden shadow-none">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="font-semibold text-base">{cohort.name}</h3>
                                        <Badge variant={statusCfg.variant} className="text-xs">
                                            {statusCfg.label}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <FormatIcon className="w-3.5 h-3.5" />
                                        <span>{cohort.format}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-2xl font-bold">${cohort.price}</p>
                                    {cohort.originalPrice > cohort.price && (
                                        <p className="text-sm text-muted-foreground line-through">${cohort.originalPrice}</p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <CardContent className="p-5 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                                {/* Details */}
                                <div className="space-y-3">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-start gap-2">
                                            <CalendarDays className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-medium">{cohort.startDate}</span>
                                                {!isSelfPaced && (
                                                    <span className="text-muted-foreground"> → {cohort.endDate}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 text-muted-foreground">
                                            <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                                            <span>{cohort.schedule}</span>
                                        </div>
                                        {!isSelfPaced && (
                                            <div className="flex items-start gap-2 text-muted-foreground">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{cohort.timezone}</span>
                                            </div>
                                        )}
                                        <div className="flex items-start gap-2 text-muted-foreground">
                                            <Users className="w-4 h-4 mt-0.5 shrink-0" />
                                            <span>Taught by {cohort.instructor}</span>
                                        </div>
                                    </div>

                                    {/* Seats */}
                                    {!isSelfPaced && (
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">
                                                    {cohort.seatsLeft === cohort.seats
                                                        ? "Spots available"
                                                        : `${cohort.seatsLeft} of ${cohort.seats} spots left`}
                                                </span>
                                                {cohort.seatsLeft <= 8 && (
                                                    <span className="text-destructive font-medium">Almost full</span>
                                                )}
                                            </div>
                                            <Progress value={seatPercent} className="h-1.5" />
                                        </div>
                                    )}
                                </div>

                                {/* Highlights + CTA */}
                                <div className="space-y-4">
                                    <ul className="space-y-1.5">
                                        {cohort.highlights.map((h) => (
                                            <li key={h} className="flex items-start gap-2 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="space-y-2">
                                        <Button
                                            className="w-full"
                                            disabled={isClosed}
                                            variant={isUpcoming ? "outline" : "default"}
                                        >
                                            {isClosed
                                                ? "Enrolment Closed"
                                                : isUpcoming
                                                    ? "Join Waitlist"
                                                    : "Enroll in This Cohort"}
                                        </Button>
                                        {!isClosed && !isUpcoming && (
                                            <p className="text-xs text-center text-muted-foreground">
                                                Enrolment deadline: <strong>{cohort.enrollDeadline}</strong>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* FAQ note */}
            <p className="text-sm text-muted-foreground border rounded-lg p-4 bg-muted/30">
                💳 <strong>Payment plans available.</strong> All cohorts include a 7-day money-back guarantee.
                Questions? <span className="text-primary cursor-pointer hover:underline">Contact us</span> before enrolling.
            </p>
        </div>
    )
}