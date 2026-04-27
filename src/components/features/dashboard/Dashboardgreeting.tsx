import { Badge } from "@/components/ui/badge"

// Replace with your auth/user query
const user = {
    name: "Test User",
    initials: "SS",
    streak: 12,
    certificates: 2,
    activeCourses: 2,
    hasLiveToday: true,
}

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
}

function formatToday() {
    return new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

export default function DashboardGreeting() {
    return (
        <div className="flex items-start justify-between gap-4 flex-wrap py-14">
            <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
                    {formatToday()}
                </p>
                <h1 className="text-4xl font-semibold">
                    {getGreeting()}, {user.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {user.hasLiveToday
                        ? `You have 1 live session today and ${user.activeCourses} courses in progress.`
                        : `You have ${user.activeCourses} courses in progress.`}
                </p>
            </div>

            {/*<div className="flex items-center gap-2 flex-wrap">*/}
            {/*    <Badge variant="secondary" className="gap-1 text-xs">*/}
            {/*        🔥 {user.streak}-day streak*/}
            {/*    </Badge>*/}
            {/*    <Badge variant="secondary" className="gap-1 text-xs">*/}
            {/*        🎓 {user.certificates} certificates*/}
            {/*    </Badge>*/}
            {/*    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex items-center justify-center shrink-0">*/}
            {/*        {user.initials}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}