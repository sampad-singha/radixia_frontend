import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, FileText, HelpCircle, Download, Lock } from "lucide-react"

type LessonType = "video" | "article" | "quiz" | "resource"

interface Lesson {
    title: string
    type: LessonType
    duration?: string
    locked?: boolean
    preview?: boolean
}

interface Module {
    title: string
    description: string
    lessons: Lesson[]
}

const lessonIcon: Record<LessonType, React.ElementType> = {
    video: PlayCircle,
    article: FileText,
    quiz: HelpCircle,
    resource: Download,
}

const modules: Module[] = [
    {
        title: "Foundations & Why Architecture Matters",
        description: "Understand the problems DDD solves and the architectural thinking behind it.",
        lessons: [
            { title: "Welcome & Course Roadmap", type: "video", duration: "5:12", preview: true },
            { title: "Why MVC Breaks Down at Scale", type: "video", duration: "14:38", preview: true },
            { title: "SOLID Principles Refresher", type: "article" },
            { title: "Setting Up the Dev Environment", type: "video", duration: "8:20" },
            { title: "Module 1 Quiz", type: "quiz" },
        ],
    },
    {
        title: "Domain-Driven Design Core Concepts",
        description: "Entities, Value Objects, Aggregates, and the Ubiquitous Language.",
        lessons: [
            { title: "The Ubiquitous Language", type: "video", duration: "11:05", locked: true },
            { title: "Entities vs. Value Objects", type: "video", duration: "18:44", locked: true },
            { title: "Aggregates & Aggregate Roots", type: "video", duration: "22:10", locked: true },
            { title: "Domain Events — What & Why", type: "video", duration: "15:30", locked: true },
            { title: "DDD Glossary Reference", type: "resource" },
            { title: "Module 2 Quiz", type: "quiz" },
        ],
    },
    {
        title: "Bounded Contexts & Context Mapping",
        description: "Structure large systems into manageable, decoupled contexts.",
        lessons: [
            { title: "What Is a Bounded Context?", type: "video", duration: "13:20", locked: true },
            { title: "Identifying Context Boundaries", type: "video", duration: "19:15", locked: true },
            { title: "Context Maps: Patterns & Anti-patterns", type: "video", duration: "16:40", locked: true },
            { title: "Mapping Contexts in Laravel", type: "video", duration: "24:00", locked: true },
        ],
    },
    {
        title: "Hexagonal Architecture (Ports & Adapters)",
        description: "Decouple your domain from frameworks, databases, and third-party services.",
        lessons: [
            { title: "The Hexagonal Architecture Mental Model", type: "video", duration: "12:55", locked: true },
            { title: "Defining Ports (Interfaces)", type: "video", duration: "17:20", locked: true },
            { title: "Writing Adapters for Laravel's Eloquent", type: "video", duration: "26:10", locked: true },
            { title: "Swapping Infrastructure Without Touching Domain Code", type: "video", duration: "20:05", locked: true },
            { title: "Module 4 Project Files", type: "resource" },
        ],
    },
    {
        title: "Repository Pattern & Persistence Abstraction",
        description: "Abstract data access so your domain never leaks into your persistence layer.",
        lessons: [
            { title: "Repositories vs. Eloquent: The Trade-off", type: "video", duration: "10:45", locked: true },
            { title: "Building a Type-Safe Repository Interface", type: "video", duration: "21:30", locked: true },
            { title: "Eloquent Adapter Implementation", type: "video", duration: "23:00", locked: true },
            { title: "Specification Pattern for Complex Queries", type: "video", duration: "18:50", locked: true },
        ],
    },
    {
        title: "CQRS — Command & Query Separation",
        description: "Separate read and write concerns for clarity and scalability.",
        lessons: [
            { title: "CQRS Explained Simply", type: "video", duration: "14:15", locked: true },
            { title: "Building a Command Bus in Laravel", type: "video", duration: "28:00", locked: true },
            { title: "Query Handlers & Read Models", type: "video", duration: "22:30", locked: true },
            { title: "Async Commands with Laravel Queues", type: "video", duration: "19:00", locked: true },
        ],
    },
    {
        title: "Event Sourcing",
        description: "Persist state as a sequence of events — and replay history.",
        lessons: [
            { title: "Event Sourcing vs. Traditional Storage", type: "video", duration: "16:00", locked: true },
            { title: "Implementing an Event Store", type: "video", duration: "30:00", locked: true },
            { title: "Projections & Read Models from Events", type: "video", duration: "24:45", locked: true },
            { title: "Snapshotting for Performance", type: "video", duration: "15:20", locked: true },
            { title: "Module 7 Quiz", type: "quiz" },
        ],
    },
    {
        title: "Capstone: Multi-Tenant SaaS Application",
        description: "Apply everything in a production-grade project from design to deployment.",
        lessons: [
            { title: "Project Overview & Architecture Decision Records", type: "video", duration: "10:00", locked: true },
            { title: "Domain Modelling the Subscription Context", type: "video", duration: "35:00", locked: true },
            { title: "Building the Billing Bounded Context", type: "video", duration: "40:00", locked: true },
            { title: "Testing Strategy: Unit → Integration → Acceptance", type: "video", duration: "32:00", locked: true },
            { title: "Deployment & Final Review", type: "video", duration: "18:00", locked: true },
            { title: "Capstone Source Code", type: "resource" },
        ],
    },
]

function formatModuleMeta(lessons: Lesson[]) {
    const videos = lessons.filter((l) => l.type === "video")
    const totalSeconds = videos.reduce((acc, l) => {
        if (!l.duration) return acc
        const [m, s] = l.duration.split(":").map(Number)
        return acc + m * 60 + (s || 0)
    }, 0)
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const timeStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
    return `${lessons.length} lessons · ${timeStr}`
}

export default function ProgramCurriculum() {
    const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0)
    const totalModules = modules.length

    return (
        <div className="space-y-5">
            {/* Summary */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h2 className="text-xl font-semibold">Course Curriculum</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {totalModules} modules · {totalLessons} lessons · 27.5 hours total
                    </p>
                </div>
                <Badge variant="secondary" className="text-xs">2 modules free to preview</Badge>
            </div>

            <Accordion type="multiple" defaultValue={["mod-0"]} className="border rounded-lg overflow-hidden divide-y">
                {modules.map((mod, idx) => (
                    <AccordionItem key={idx} value={`mod-${idx}`} className="border-0">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/40">
                            <div className="flex items-start gap-3 text-left w-full pr-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Module {idx + 1}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-sm leading-snug mt-0.5">{mod.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{formatModuleMeta(mod.lessons)}</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                            <p className="text-sm text-muted-foreground px-5 pt-3 pb-2 border-t border-b bg-muted/20">
                                {mod.description}
                            </p>
                            <ul className="divide-y">
                                {mod.lessons.map((lesson, li) => {
                                    const Icon = lessonIcon[lesson.type]
                                    return (
                                        <li
                                            key={li}
                                            className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-muted/30 transition-colors"
                                        >
                                            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                                            <span className="flex-1 leading-snug">{lesson.title}</span>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {lesson.preview && (
                                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium text-primary border-primary/30">
                                                        Preview
                                                    </Badge>
                                                )}
                                                {lesson.locked && (
                                                    <Lock className="w-3 h-3 text-muted-foreground" />
                                                )}
                                                {lesson.duration && (
                                                    <span className="text-xs text-muted-foreground tabular-nums">
                                                        {lesson.duration}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}