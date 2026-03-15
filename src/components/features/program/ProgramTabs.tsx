import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import ProgramOverview from "@/components/features/program/ProgramOverview"
import ProgramCurriculum from "@/components/features/program/ProgramCurriculum"
import ProgramCohorts from "@/components/features/program/ProgramCohorts"

export default function ProgramTabs() {
    return (
        <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto gap-0">
                <TabsTrigger
                    value="overview"
                    className="border-b-2 data-[state=active]:bg-accent px-4  py-3 text-sm font-medium">
                    Overview
                </TabsTrigger>
                <TabsTrigger
                    value="curriculum"
                    className="border-b-2 data-[state=active]:bg-accent px-4  py-3 text-sm font-medium">
                    Curriculum
                </TabsTrigger>
                <TabsTrigger
                    value="cohorts"
                    className="border-b-2 data-[state=active]:bg-accent px-4 py-3 text-sm font-medium">
                    Cohorts
                </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
                <ProgramOverview />
            </TabsContent>
            <TabsContent value="curriculum">
                <ProgramCurriculum />
            </TabsContent>
            <TabsContent value="cohorts">
                <ProgramCohorts />
            </TabsContent>
        </Tabs>
    )
}