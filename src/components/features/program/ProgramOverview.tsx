import {CheckCircle2, AlertCircle, Target, ChevronUp, ChevronDown} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {useLayoutEffect, useRef, useState} from "react";

const learningOutcomes = [
    "Apply Domain-Driven Design principles to real Laravel projects",
    "Structure applications using Hexagonal (Ports & Adapters) Architecture",
    "Implement CQRS — separating command and query responsibilities",
    "Build event-driven systems with Event Sourcing in Laravel",
    "Write clean, testable, and maintainable PHP code",
    "Design bounded contexts and aggregate roots correctly",
    "Use repositories and specifications to abstract persistence",
    "Integrate third-party services without coupling your domain",
    "Write unit, integration, and acceptance tests confidently",
    "Refactor legacy Laravel apps toward cleaner architecture",
]

const prerequisites = [
    "Solid understanding of PHP (OOP required)",
    "Experience with Laravel 10+ (routes, Eloquent, controllers)",
    "Familiarity with Composer and PSR standards",
    "Basic knowledge of design patterns (SOLID principles recommended)",
]

const targetAudience = [
    "Laravel developers who want to move beyond tutorials into production architecture",
    "Backend engineers building complex, long-lived SaaS or enterprise applications",
    "Tech leads looking for a consistent architectural playbook for their team",
    "Developers frustrated with spaghetti code and seeking structured solutions",
]

export default function ProgramOverview() {
    return (
        <div className="space-y-10">
            {/* What You'll Learn */}
            <section>
                <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
                <div className="border rounded-lg p-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {learningOutcomes.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            {/* Requirements / Prerequisites */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2.5">
                    {prerequisites.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <Separator />

            {/* Who This Is For */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Who this is for</h2>
                <ul className="space-y-2.5">
                    {targetAudience.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                            <Target className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <Separator />

            {/* Course Description */}
            <CourseDescription />

            <Separator />
        </div>
    )
}

function CourseDescription() {
    const [expanded, setExpanded] = useState(false)
    const [height, setHeight] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
        }
    }, [])

    return (
        <section>
            <h2 className="text-xl font-semibold mb-3">About this course</h2>

            <div className="relative">

                <div
                    style={{ height: expanded ? height : 160 }}
                    className="overflow-hidden transition-[height] duration-500 ease-in-out"
                >
                    <div
                        ref={contentRef}
                        className="text-sm text-muted-foreground leading-relaxed space-y-3"
                    >
                        <p>
                            This is not another CRUD tutorial. This course tackles the real challenge most Laravel developers hit
                            around year two — when the codebase gets large enough that simple MVC patterns start breaking down.
                            You need architectural thinking, and this course gives you exactly that. Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind.
                        </p>

                        <p>
                            We cover Domain-Driven Design from first principles, then apply it specifically to Laravel's ecosystem.
                            You'll implement bounded contexts, aggregates, domain events, and repositories — and you'll see how
                            these concepts map onto real Laravel code, not just theory. Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind.
                        </p>

                        <p>
                            Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind. Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind. Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind.
                        </p>

                        <p>
                            Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind. Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind.
                        </p>

                        <p>
                            Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind. Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                            using everything you've learned. All code is available on GitHub, and every decision is explained with
                            trade-offs in mind.
                        </p>
                    </div>
                </div>

                {!expanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
                )}

            </div>

            <div className="flex justify-center mt-3">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-sm font-medium text-primary"
                >
                    {expanded ? (
                        <div className="cursor-pointer flex items-center gap-2">
                            <ChevronUp className="w-4 h-4" />
                            Show less
                        </div>
                    ) : (
                        <div className="cursor-pointer flex items-center gap-2">
                            <ChevronDown className="w-4 h-4" />
                            See more
                        </div>
                    )}
                </button>
            </div>
        </section>
    )
}