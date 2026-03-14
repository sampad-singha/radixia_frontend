import ExploreSearch from "@/features/explore/components/ExploreSearch.tsx";
import ExploreTabs from "@/features/explore/components/ExploreTabs.tsx";
import ExploreGrid from "@/features/explore/components/ExploreGrid.tsx";
import ExploreFilters from "@/features/explore/components/ExploreFilters.tsx";
import {useState} from "react";
import type {ExplorePaginator, ExploreParams} from "@/features/explore/types/explore.types.ts";
import {useExplore} from "@/features/explore/queries/explore.queries.ts";

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
        <div className="space-y-6 px-4 w-full max-w-6xl mx-auto py-6">

            <h1 className="text-2xl font-semibold">
                Explore
            </h1>

            {/* Search + Filter Row */}
            <div className="flex items-center justify-between gap-4">

                <ExploreSearch
                    params={params}
                    setParams={setParams}
                />

                <ExploreFilters
                    params={params}
                    setParams={setParams}
                />

            </div>

            {/* Tabs */}
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

            </div>


            {/* Results */}
            <ExploreGrid
                params={params}
                setParams={setParams}
                data={data}
                isLoading={isLoading}
            />

        </div>
    )
}