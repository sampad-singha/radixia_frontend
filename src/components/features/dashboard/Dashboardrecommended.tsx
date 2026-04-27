import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Replace with your recommendations query
const items = [
    {
        id: "1",
        icon: "🔷",
        title: "Advanced TypeScript",
        description: "Type gymnastics, generics & design patterns",
        duration: "12h",
        level: "Intermediate",
        type: "course",
        slug: "advanced-typescript",
    },
    {
        id: "2",
        icon: "☁️",
        title: "AWS Cloud Practitioner",
        description: "Foundations of cloud infrastructure & services",
        duration: "18h",
        level: "Beginner",
        type: "course",
        slug: "aws-cloud-practitioner",
    },
    {
        id: "3",
        icon: "🧠",
        title: "Data Structures & Algorithms",
        description: "Ace interviews with patterns & complexity",
        duration: "24h",
        level: "Advanced",
        type: "course",
        slug: "dsa",
    },
]

const levelVariant: Record<string, "default" | "secondary" | "outline"> = {
    Beginner: "secondary",
    Intermediate: "secondary",
    Advanced: "secondary",
}

export default function DashboardRecommended() {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Recommended for you</h2>
                <button className="text-xs text-muted-foreground hover:text-foreground">
                    Browse catalog →
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-xl p-4 bg-card space-y-3 hover:border-border/80 transition-colors cursor-pointer"
                    >
                        <div className="text-2xl">{item.icon}</div>

                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold">{item.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-1.5 flex-wrap">
                                <Badge variant="outline" className="text-[10px]">
                                    {item.duration}
                                </Badge>
                                <Badge
                                    variant={levelVariant[item.level] ?? "secondary"}
                                    className="text-[10px]"
                                >
                                    {item.level}
                                </Badge>
                            </div>
                            <Button size="sm" variant="ghost" className="h-7 px-2 gap-1 text-xs" asChild>
                                <a href={`/programs/${item.slug}`}>
                                    Explore
                                    <ArrowRight className="w-3 h-3" />
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}