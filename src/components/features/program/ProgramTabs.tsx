import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import ProgramOverview from "@/components/features/program/ProgramOverview"
import ProgramCurriculum from "@/components/features/program/ProgramCurriculum"
import ProgramCohorts from "@/components/features/program/ProgramCohorts"

type Props = {
    activeTab: string
    onTabChange: (value: string) => void
    overview?: any
}

export default function ProgramTabs({activeTab, onTabChange, overview}: Props) {
    return (
        <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className="space-y-6"
        >
            <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto">

                <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium
                               data-[state=active]:bg-accent
                               data-[state=active]:text-foreground
                               text-muted-foreground"
                >
                    Overview
                </TabsTrigger>

                <TabsTrigger
                    value="curriculum"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium
                               data-[state=active]:bg-accent
                               data-[state=active]:text-foreground
                               text-muted-foreground"
                >
                    Curriculum
                </TabsTrigger>

                <TabsTrigger
                    value="cohorts"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium
                               data-[state=active]:bg-accent
                               data-[state=active]:text-foreground
                               text-muted-foreground"
                >
                    Cohorts
                </TabsTrigger>

            </TabsList>

            <TabsContent value="overview">
                <ProgramOverview data={overview} />
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