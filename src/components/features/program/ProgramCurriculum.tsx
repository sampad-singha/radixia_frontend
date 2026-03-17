import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, FileText, HelpCircle, Download, Lock } from "lucide-react"
import { useParams } from "react-router-dom"
import {useProgramCurriculum} from "@/queries/program.queries.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

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
    const { slug } = useParams()

    const { data, isLoading, isError } = useProgramCurriculum(slug)

    const modules: Module[] = data?.data?.modules ?? []

    if (isLoading) {
        return (
            <div className="space-y-5">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-28" />
                    </div>

                    <Skeleton className="h-5 w-24" />
                </div>

                {/* Accordion */}
                <div className="border rounded-lg overflow-hidden divide-y">

                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i}>

                            {/* Module header */}
                            <div className="px-5 py-4 bg-muted/40 space-y-2">
                                <Skeleton className="h-4 w-52" />
                                <Skeleton className="h-3 w-32" />
                            </div>

                            {/* Lessons */}
                            <div className="py-2">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div
                                        key={j}
                                        className="flex items-center gap-3 px-5 py-3"
                                    >
                                        <Skeleton className="w-4 h-4 rounded" />

                                        <Skeleton className="flex-1 h-4" />

                                        <Skeleton className="w-10 h-3" />
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-sm text-destructive">
                Failed to load curriculum
            </div>
        )
    }

    const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0)
    const totalModules = modules.length

    return (
        <div className="space-y-5">
            {/* Summary */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h2 className="text-xl font-semibold">Course Curriculum</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {totalModules} modules · {totalLessons} lessons
                    </p>
                </div>

                <Badge variant="secondary" className="text-xs">
                    Preview available
                </Badge>
            </div>

            <Accordion
                type="multiple"
                defaultValue={["mod-0"]}
                className="border rounded-lg overflow-hidden divide-y"
            >
                {modules.map((mod, idx) => (
                    <AccordionItem
                        key={idx}
                        value={`mod-${idx}`}
                        className="border-0"
                    >
                        <AccordionTrigger className="px-5 py-4 hover:no-underline bg-muted/40 rounded-none border-b hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/40">
                            <div className="flex items-start gap-3 text-left w-full pr-4">
                                <div className="flex-1">
                                    {/*<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">*/}
                                    {/*    Module {idx + 1}*/}
                                    {/*</span>*/}

                                    <p className="font-semibold text-sm leading-snug mt-0.5">
                                        {mod.title}
                                    </p>

                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatModuleMeta(mod.lessons)}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-0 py-4 border-b">
                            {/*<p className="text-sm text-muted-foreground px-5 pt-3 pb-2 border-b bg-muted/20">*/}
                            {/*    {mod.description}*/}
                            {/*</p>*/}

                            <ul className="divide-y">
                                {mod.lessons.map((lesson, li) => {
                                    const Icon = lessonIcon[lesson.type]

                                    return (
                                        <li
                                            key={li}
                                            className="flex items-center gap-3 px-5 py-3 text-sm border-0 hover:bg-muted/30 transition-colors"
                                        >
                                            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />

                                            <span className="flex-1 leading-snug">
                                                {lesson.title}
                                            </span>

                                            <div className="flex items-center gap-2 shrink-0">
                                                {lesson.preview && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-[10px] px-1.5 py-0 h-4 font-medium text-primary border-primary/30"
                                                    >
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