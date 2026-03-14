import { Button } from "@/components/ui/button"

export default function ProgramCohorts() {
    return (
        <div className="space-y-6 max-w-3xl">

            <h2 className="text-xl font-semibold">
                Cohorts
            </h2>

            {/* Cohort 1 */}
            <div className="border rounded-lg p-4 flex items-center justify-between">

                <div className="space-y-1">
                    <p className="font-medium">
                        Alpha Batch 2026
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Apr 1, 2026 — Jul 1, 2026
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Capacity: 30 students
                    </p>

                    <p className="text-sm">
                        Status: <span className="capitalize">active</span>
                    </p>
                </div>

                <div className="text-right space-y-2">

                    <p className="text-lg font-semibold">
                        $300
                    </p>

                    <Button>
                        Enroll Now
                    </Button>

                </div>

            </div>


            {/* Cohort 2 */}
            <div className="border rounded-lg p-4 flex items-center justify-between">

                <div className="space-y-1">
                    <p className="font-medium">
                        Beta Batch 2026
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Sep 1, 2026 — Dec 1, 2026
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Capacity: 25 students
                    </p>

                    <p className="text-sm">
                        Status: <span className="capitalize">scheduled</span>
                    </p>
                </div>

                <div className="text-right space-y-2">

                    <p className="text-lg font-semibold">
                        $300
                    </p>

                    <Button variant="outline">
                        Coming Soon
                    </Button>

                </div>

            </div>

        </div>
    )
}