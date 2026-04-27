// features/explore/queries/explore.queries.ts

import { useQuery } from "@tanstack/react-query"
import { fetchExplore } from "@/services/explore.service.ts"
import type {
    ExploreParams,
    ExplorePaginator
} from "@/lib/types/explore.types.ts"

export function useExplore(params: ExploreParams) {
    return useQuery<ExplorePaginator>({
        queryKey: ["explore", params],
        queryFn: () => fetchExplore(params),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2
    })
}