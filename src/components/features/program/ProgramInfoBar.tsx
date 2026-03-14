import { Clock, BookOpen, Layers, BarChart2, Award, Wifi } from "lucide-react"

const stats = [
    { icon: Clock, label: "Duration", value: "27.5 hours" },
    { icon: BookOpen, label: "Lessons", value: "120" },
    { icon: Layers, label: "Modules", value: "8" },
    { icon: BarChart2, label: "Level", value: "Advanced" },
    { icon: Award, label: "Certificate", value: "Included" },
    { icon: Wifi, label: "Access", value: "Lifetime" },
]

export default function ProgramInfoBar() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px border rounded-lg overflow-hidden bg-border">
            {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-background px-4 py-4 flex flex-col items-start gap-1.5">
                    <Icon className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold leading-tight">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                </div>
            ))}
        </div>
    )
}