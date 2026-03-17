import { useParams } from "react-router-dom"
import { useState } from "react"

import { useProgram, useProgramOverview } from "@/queries/program.queries.ts"

import ProgramHero from "@/components/features/program/ProgramHero"
import ProgramInfoBar from "@/components/features/program/ProgramInfoBar"
import ProgramTabs from "@/components/features/program/ProgramTabs"
import ProgramSidebar from "@/components/features/program/ProgramSidebar"
import Instructor from "@/components/features/program/Instructor"
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function ProgramDetailPage() {
    const { slug } = useParams()
    const [activeTab, setActiveTab] = useState("overview")

    const { data: program, isLoading } = useProgram(slug)

    const { data: overview } = useProgramOverview(
        slug,
        activeTab === "overview"
    )

    if (isLoading || !program) {
        return (
            <div className="pb-20">

                {/* Hero */}
                <div className="bg-muted/40">
                    <div className="max-w-7xl mx-auto px-4 py-10 space-y-4">
                        <Skeleton className="h-16 w-2/3" />
                        <Skeleton className="h-24 w-2/3" />
                        <Skeleton className="h-24 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 pt-10">
                    <div className="grid lg:grid-cols-3 gap-10 items-start">

                        {/* Left */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* InfoBar */}
                            <div className="flex gap-6">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-24" />
                            </div>

                            {/* Tabs */}
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-8 w-24" />
                                </div>

                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-[90%]" />
                                    <Skeleton className="h-4 w-[80%]" />
                                    <Skeleton className="h-4 w-[85%]" />
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex gap-4 items-center">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-4">
                            <Skeleton className="h-40 w-full rounded-lg" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="pb-20">

            <ProgramHero data={program} />

            <div className="max-w-7xl mx-auto px-4 pt-10">
                <div className="grid lg:grid-cols-3 gap-10 items-start">

                    <div className="lg:col-span-2 space-y-8">
                        <ProgramInfoBar data={program.stats} />

                        <ProgramTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            overview={overview}
                        />

                        <Instructor data={program.instructor} />
                    </div>

                    <div className="lg:col-span-1">
                        <ProgramSidebar data={program} />
                    </div>

                </div>
            </div>
        </div>
    )
}