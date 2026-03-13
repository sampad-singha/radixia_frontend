import ExploreSearch from "@/features/explore/components/ExploreSearch.tsx";
import ExploreTabs from "@/features/explore/components/ExploreTabs.tsx";
import ExploreGrid from "@/features/explore/components/ExploreGrid.tsx";
import ExploreFilters from "@/features/explore/components/ExploreFilters.tsx";
import {useState} from "react";
import type {ExploreParams} from "@/features/explore/types/explore.types.ts";

export default function ExplorePage() {
    const [params, setParams] = useState<ExploreParams>({
        page: 1,
        type: "all",
        sort: "popular"
    })

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
            <ExploreTabs
                params={params}
                setParams={setParams}
            />


            {/* Results */}
            <ExploreGrid params={params} />

        </div>
    )
}