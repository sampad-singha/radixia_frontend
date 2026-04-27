import {CheckCircle2, AlertCircle, Target} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ProgramDescription from "@/components/features/program/ProgramDescription.tsx";

type Props = {
    data?: {
        learningOutcomes?: string[]
        prerequisites?: string[]
        targetAudience?: string[]
        description?: string
    }
}

export default function ProgramOverview({ data }: Props) {

    const learningOutcomes = data?.learningOutcomes ?? []
    const prerequisites = data?.prerequisites ?? []
    const targetAudience = data?.targetAudience ?? []

    return (
        <div className="space-y-10">

            {/* What You'll Learn */}
            {learningOutcomes.length > 0 && (
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
            )}

            {learningOutcomes.length > 0 && <Separator />}

            {/* Requirements */}
            {prerequisites.length > 0 && (
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
            )}

            {prerequisites.length > 0 && <Separator />}

            {/* Audience */}
            {targetAudience.length > 0 && (
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
            )}

            {targetAudience.length > 0 && <Separator />}

            {/* Description */}
            {data?.description && (
                <>
                    <ProgramDescription description={data.description} />
                    <Separator />
                </>
            )}

        </div>
    )
}