"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, ArrowRight } from "lucide-react"

// Mock data
const nextSession = {
    title: "System Design Cohort",
    module: "Module 7 · Distributed Caching",
    time: "8:00 PM",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    startsInSeconds: 8100,
    joinUrl: "#",
}

const continueItem = {
    title: "React Mastery",
    module: "Module 4 · Custom Hooks",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop",
    overallProgress: 45,
    lastWatched: "2h ago",
    resumeUrl: "#",
}

function useTimer(initialSeconds: number) {
    const [seconds, setSeconds] = React.useState(initialSeconds)
    React.useEffect(() => {
        if (seconds <= 0) return
        const interval = setInterval(() => setSeconds((prev) => prev - 1), 1000)
        return () => clearInterval(interval)
    }, [seconds])

    return {
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60,
    }
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
    return (
        <div className="text-center">
            <div className="text-xl font-semibold tabular-nums leading-none">
                {String(value).padStart(2, "0")}
            </div>
            <div className="text-[9px] text-muted-foreground uppercase mt-1 tracking-tighter">{label}</div>
        </div>
    )
}

export default function DashboardHeroRow() {
    const { hours, minutes, seconds } = useTimer(nextSession.startsInSeconds)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Next Live Session */}
            <div className="flex flex-col justify-between bg-muted/40 border rounded-xl p-5 space-y-4">
                <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 rounded-lg border overflow-hidden bg-background">
                        <img src={nextSession.thumbnail} className="object-cover h-full w-full" alt={nextSession.title} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Live Session</p>
                        <h2 className="text-lg font-semibold mt-0.5 line-clamp-1">{nextSession.title}</h2>
                        <p className="text-sm text-muted-foreground line-clamp-1">{nextSession.module}</p>
                    </div>
                </div>

                <div className="flex items-end justify-between border-t pt-4">
                    <div className="space-y-1.5">
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">Starts in</p>
                        <div className="flex items-center gap-3">
                            <CountdownBlock label="hrs" value={hours} />
                            <span className="text-muted-foreground/50 mb-4">:</span>
                            <CountdownBlock label="min" value={minutes} />
                            <span className="text-muted-foreground/50 mb-4">:</span>
                            <CountdownBlock label="sec" value={seconds} />
                        </div>
                    </div>
                    <Button size="sm" asChild className="rounded-full px-5 shadow-sm">
                        <a href={nextSession.joinUrl}>
                            <PlayCircle className="mr-2 h-4 w-4" /> Join Class
                        </a>
                    </Button>
                </div>
            </div>

            {/* Continue Learning */}
            <div className="flex flex-col justify-between bg-muted/40 border rounded-xl p-5 space-y-4">
                <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 rounded-lg border overflow-hidden bg-background">
                        <img src={continueItem.thumbnail} className="object-cover h-full w-full" alt={continueItem.title} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Continue Learning</p>
                        <h2 className="text-lg font-semibold mt-0.5 line-clamp-1">{continueItem.title}</h2>
                        <p className="text-sm text-muted-foreground line-clamp-1">{continueItem.module}</p>
                    </div>
                </div>

                <div className="flex items-end justify-between border-t pt-4">
                    <div className="space-y-2 flex-1 max-w-[180px]">
                        <div className="flex justify-between text-[10px] font-medium uppercase text-muted-foreground">
                            <span>Progress</span>
                            <span>{continueItem.overallProgress}%</span>
                        </div>
                        <Progress value={continueItem.overallProgress} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground italic">Last watched {continueItem.lastWatched}</p>
                    </div>
                    <Button size="sm" variant="secondary" asChild className="rounded-full px-5 border">
                        <a href={continueItem.resumeUrl}>
                            Resume <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}