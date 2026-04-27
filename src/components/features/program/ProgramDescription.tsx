import { ChevronUp, ChevronDown } from "lucide-react"
import { useLayoutEffect, useRef, useState } from "react"

type Props = {
    description?: string
}

export default function ProgramDescription({ description }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [height, setHeight] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    // Recalculate height whenever description changes
    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
        }
    }, [description])

    // Split paragraphs from backend (\n\n)
    const paragraphs = description
        ? description.split("\n\n")
        : []

    return (
        <section>
            <h2 className="text-xl font-semibold mb-3">
                About this course
            </h2>

            <div className="relative">

                <div
                    style={{ height: expanded ? height : 160 }}
                    className="overflow-hidden transition-[height] duration-500 ease-in-out"
                >
                    <div
                        ref={contentRef}
                        className="text-sm text-muted-foreground leading-relaxed space-y-3"
                    >
                        {paragraphs.length > 0 ? (
                            paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))
                        ) : (
                            <p>No description available.</p>
                        )}
                    </div>
                </div>

                {!expanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
                )}
            </div>

            {/* Toggle */}
            {height > 160 && (
                <div className="flex justify-center mt-3">
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="flex items-center gap-1 text-sm font-medium text-primary"
                    >
                        {expanded ? (
                            <span className="flex items-center gap-2">
                                <ChevronUp className="w-4 h-4" />
                                Show less
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ChevronDown className="w-4 h-4" />
                                See more
                            </span>
                        )}
                    </button>
                </div>
            )}
        </section>
    )
}