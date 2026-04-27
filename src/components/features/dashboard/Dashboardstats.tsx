// Replace with your stats query e.g. useDashboardStats()
const stats = [
    { label: "Courses enrolled", value: "5", sub: "3 active" },
    { label: "Hours learned", value: "63", sub: "↑ 4h this week" },
    { label: "Cohorts joined", value: "2", sub: "1 ongoing" },
    { label: "Avg. quiz score", value: "84%", sub: "top 20%" },
]

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
                <div
                    key={s.label}
                    className="bg-muted/50 rounded-lg px-4 py-3 space-y-1"
                >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        {s.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-semibold">{s.value}</span>
                        <span className="text-xs text-muted-foreground">{s.sub}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}