import { Clock, BookOpen, Layers, BarChart2, Award, Wifi } from "lucide-react"

type Props = {
    data?: {
        durationHours?: number
        lessons?: number
        modules?: number
        level?: string
    }
}

export default function ProgramInfoBar({ data }: Props) {

    const stats = [
        {
            icon: Clock,
            label: "Duration",
            value: data?.durationHours ? `${data.durationHours} hours` : "-"
        },
        {
            icon: BookOpen,
            label: "Lessons",
            value: data?.lessons ?? "-"
        },
        {
            icon: Layers,
            label: "Modules",
            value: data?.modules ?? "-"
        },
        {
            icon: BarChart2,
            label: "Level",
            value: data?.level ?? "-"
        },
        {
            icon: Award,
            label: "Certificate",
            value: "Included" // still static (not in API)
        },
        {
            icon: Wifi,
            label: "Access",
            value: "Lifetime" // still static (not in API)
        },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px border rounded-lg overflow-hidden bg-border">
            {stats.map(({ icon: Icon, label, value }) => (
                <div
                    key={label}
                    className="bg-background px-4 py-4 flex flex-col items-start gap-1.5"
                >
                    <Icon className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold leading-tight">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                </div>
            ))}
        </div>
    )
}