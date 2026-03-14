import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

import ProgramOverview from "@/components/features/program/ProgramOverview"
import ProgramCurriculum from "@/components/features/program/ProgramCurriculum"
import ProgramCohorts from "@/components/features/program/ProgramCohorts"

export default function ProgramTabs() {
    return (
        <Tabs defaultValue="overview" className="space-y-6">

            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
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