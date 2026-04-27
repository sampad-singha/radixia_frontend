import ExploreSearch from "@/components/features/explore/ExploreSearch.tsx";
import ExploreTabs from "@/components/features/explore/ExploreTabs.tsx";
import ExploreGrid from "@/components/features/explore/ExploreGrid.tsx";
import ExploreFilters from "@/components/features/explore/ExploreFilters.tsx";
import {useState} from "react";
import type {ExplorePaginator, ExploreParams} from "@/lib/types/explore.types.ts";
import {useExplore} from "@/queries/explore.queries.ts";
import ExploreSort from "@/components/features/explore/ExploreSort.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export default function ExplorePage() {

    const [params, setParams] = useState<ExploreParams>({
        page: 1,
        type: "all",
        sort: "popular"
    })

    const { data, isLoading } = useExplore(params) as {
        data?: ExplorePaginator
        isLoading: boolean
    }

    const items = data?.data || []

    const start = data
        ? (data.current_page - 1) * data.per_page + 1
        : 0

    const end = data
        ? start + items.length - 1
        : 0

    return (
        <div className="space-y-6 px-4 w-full max-w-7xl mx-auto py-6">

            <h1 className="text-2xl font-semibold">
                Explore
            </h1>

            <div className="flex items-center justify-center gap-4">

                <ExploreSearch
                    params={params}
                    setParams={setParams}
                />

            </div>

            {/* Tabs + Result Count */}
            <div className="flex items-center justify-between">

                <ExploreTabs
                    params={params}
                    setParams={setParams}
                />

                {data && (
                    <p className="text-sm text-muted-foreground">
                        Showing {start}-{end} of {data.total} results
                    </p>
                )}

                <ExploreSort
                    params={params}
                    setParams={setParams}
                />

            </div>

            <Separator />

            <div className="grid grid-cols-12 gap-8">

                {/* Filters */}
                <aside className="col-span-3">

                    <ExploreFilters
                        params={params}
                        setParams={setParams}
                    />

                </aside>

                {/* Results */}
                <main className="col-span-9">

                    <ExploreGrid
                        params={params}
                        setParams={setParams}
                        data={data}
                        isLoading={isLoading}
                    />

                </main>

            </div>

        </div>
    )
}