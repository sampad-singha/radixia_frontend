import ExploreSearch from "@/features/explore/components/ExploreSearch.tsx";
import ExploreTabs from "@/features/explore/components/ExploreTabs.tsx";
import ExploreGrid from "@/features/explore/components/ExploreGrid.tsx";
import ExploreFilters from "@/features/explore/components/ExploreFilters.tsx";

export default function ExplorePage() {
  return (
    <div className="space-y-6 px-4 w-full max-w-5xl mx-auto py-6">

      <h1 className="text-2xl font-semibold">
        Explore
      </h1>

        {/* Search + Filter Row */}
        <div className="flex items-center justify-between gap-4">

            <ExploreSearch />

            <ExploreFilters />

        </div>

        {/* Tabs */}
        <ExploreTabs />

        {/* Results */}
        <ExploreGrid />

    </div>
  )
}