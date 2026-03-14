import ProgramCard from "./ProgramCard.tsx"
import ExplorePagination from "@/components/features/explore/ExplorePagination.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
export default function ExploreGrid({ data, isLoading, params, setParams }: any) {

    if (isLoading && !data) {
        return (
            <div className="space-y-4">

                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-5 px-4 py-4 border-b">

                        {/* Thumbnail */}
                        <Skeleton className="w-64 h-40 flex-shrink-0" />

                        {/* Content */}
                        <div className="flex flex-col flex-1 gap-3">

                            {/* Title + price */}
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-2/3" />
                                <Skeleton className="h-5 w-16" />
                            </div>

                            {/* Description */}
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />

                            {/* Instructor */}
                            <Skeleton className="h-4 w-40" />

                            {/* Stats */}
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        )
    }

    const items = data?.data || []

    if (!items.length) {
        return (
            <div className="py-16 text-center text-muted-foreground">
                No programs found.
            </div>
        )
    }

    return (
        <>
            <div className="space-y-4">
                {items.map(item => (
                    <ProgramCard key={item.id} item={item} />
                ))}
            </div>

            <ExplorePagination
                meta={data}
                params={params}
                setParams={setParams}
            />
        </>
    )
}