import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock } from "lucide-react"

// Replace with your learning/enrollment query
const courses = [
    {
        id: "1",
        icon: "⚛️",
        title: "React Mastery",
        meta: "Module 4 · Custom Hooks",
        progress: 45,
        status: "active" as const,
    },
    {
        id: "2",
        icon: "🟩",
        title: "Node.js Fundamentals",
        meta: "Module 2 · Async & Promises",
        progress: 20,
        status: "active" as const,
    },
    {
        id: "3",
        icon: "🐍",
        title: "Python for Data Science",
        meta: "Completed · 8 modules",
        progress: 100,
        status: "completed" as const,
    },
]

const cohorts = [
    {
        id: "1",
        icon: "⚙️",
        title: "System Design Cohort",
        meta: "Cohort 3 · 8 sessions remaining · Instructor: Alex Chen",
        status: "live" as const,
    },
    {
        id: "2",
        icon: "🔙",
        title: "Backend Bootcamp",
        meta: "Completed Jan 2026 · Certificate earned",
        status: "ended" as const,
    },
]

// Replace with your schedule/calendar query
const schedule: {
    date: string
    label: string
    items: { time: string; title: string; sub: string; color: string }[]
}[] = [
    {
        date: "18 Mar",
        label: "Today",
        items: [
            {
                time: "8:00 PM",
                title: "System Design · Distributed Caching",
                sub: "Live · 90 min · Zoom",
                color: "bg-blue-500",
            },
        ],
    },
    {
        date: "19 Mar",
        label: "Tomorrow",
        items: [
            {
                time: "7:00 PM",
                title: "React Mastery · Office Hours",
                sub: "Optional · 45 min",
                color: "bg-emerald-500",
            },
            {
                time: "9:00 PM",
                title: "Node.js · Assignment due",
                sub: "Async streams + buffers",
                color: "bg-amber-400",
            },
        ],
    },
    {
        date: "20 Mar",
        label: "Thu",
        items: [
            {
                time: "8:00 PM",
                title: "System Design · Load Balancing",
                sub: "Live · 90 min · Zoom",
                color: "bg-blue-500",
            },
        ],
    },
]

const courseStatusBadge: Record<
    "active" | "completed",
    { label: string; variant: "default" | "secondary" | "outline" }
> = {
    active: { label: "In progress", variant: "default" },
    completed: { label: "Completed", variant: "secondary" },
}

const cohortStatusBadge: Record<
    "live" | "ended",
    { label: string; variant: "default" | "secondary" | "outline" }
> = {
    live: { label: "Live", variant: "default" },
    ended: { label: "Ended", variant: "secondary" },
}

export default function DashboardLearningRow() {
    return (
        <div className="grid md:grid-cols-2 gap-4">

            {/* My learning */}
            <div className="border rounded-xl p-5 bg-card space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold">My Learning</h2>
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                        View all →
                    </button>
                </div>

                {/* Courses */}
                <div className="space-y-3">
                    {courses.map((c) => {
                        const cfg = courseStatusBadge[c.status]
                        return (
                            <div key={c.id} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg border bg-muted flex items-center justify-center text-base shrink-0">
                                    {c.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium truncate">{c.title}</span>
                                        <Badge variant={cfg.variant} className="text-[10px] shrink-0">
                                            {cfg.label}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{c.meta}</p>
                                    {c.status !== "completed" && (
                                        <Progress
                                            value={c.progress}
                                            className="h-1 mt-1.5"
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="border-t pt-3 space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                        Cohorts
                    </p>
                    {cohorts.map((c) => {
                        const cfg = cohortStatusBadge[c.status]
                        return (
                            <div key={c.id} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg border bg-muted flex items-center justify-center text-base shrink-0">
                                    {c.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium truncate">{c.title}</span>
                                        <Badge variant={cfg.variant} className="text-[10px] shrink-0">
                                            {cfg.label}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{c.meta}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Schedule */}
            <div className="border rounded-xl p-5 bg-card space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold">Upcoming</h2>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        Calendar
                    </button>
                </div>

                <div className="space-y-3">
                    {schedule.map((group, gi) => (
                        <div key={gi}>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                                {group.label} · {group.date}
                            </p>
                            <div className="space-y-2 pl-1">
                                {group.items.map((item, ii) => (
                                    <div key={ii} className="flex items-start gap-2.5">
                                        <div className="text-[10px] text-muted-foreground w-10 pt-0.5 shrink-0">
                                            {item.time}
                                        </div>
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                                        <div>
                                            <p className="text-sm font-medium leading-tight">{item.title}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                <Clock className="w-3 h-3" />
                                                {item.sub}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {gi < schedule.length - 1 && <div className="border-t mt-3" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}