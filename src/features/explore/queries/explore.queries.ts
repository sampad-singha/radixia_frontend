// features/explore/queries/explore.queries.ts

import { useQuery } from "@tanstack/react-query"
import { fetchExplore } from "@/features/explore/services/explore.service"
import type {
    ExploreParams,
    ExplorePaginator
} from "@/features/explore/types/explore.types"

export function useExplore(params: ExploreParams) {
    return useQuery<ExplorePaginator>({
        queryKey: ["explore", params],
        queryFn: () => fetchExplore(params),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2
    })
}