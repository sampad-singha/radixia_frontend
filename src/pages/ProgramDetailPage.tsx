import { useParams } from "react-router-dom"
import ProgramHero from "@/components/features/program/ProgramHero"
import ProgramInfoBar from "@/components/features/program/ProgramInfoBar"
import ProgramTabs from "@/components/features/program/ProgramTabs"
import ProgramSidebar from "@/components/features/program/ProgramSidebar"
import Instructor from "@/components/features/program/Instructor.tsx";

export default function ProgramDetailPage() {
    const { slug } = useParams()

    return (
        <div className="pb-20">
            {/* Hero — full width with its own background */}
            <ProgramHero />

            {/* Body */}
            <div className="max-w-7xl mx-auto px-4 pt-10">
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        <ProgramInfoBar />
                        <ProgramTabs />
                        <Instructor />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProgramSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}