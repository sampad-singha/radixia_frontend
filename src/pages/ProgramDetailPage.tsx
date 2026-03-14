import { useParams } from "react-router-dom"
import ProgramHero from "@/components/features/program/ProgramHero"
import ProgramInfoBar from "@/components/features/program/ProgramInfoBar"
import ProgramTabs from "@/components/features/program/ProgramTabs"

export default function ProgramDetailPage() {
    const { slug } = useParams()

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

            <ProgramHero />

            <ProgramInfoBar />

            <ProgramTabs />

        </div>
    )
}