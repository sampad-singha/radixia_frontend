import { useQuery } from "@tanstack/react-query"
import {
    fetchProgram,
    fetchProgramOverview,
    getProgramCohorts,
    getProgramCurriculum
} from "@/services/program.service.ts"

export function useProgram(slug?: string) {
    return useQuery({
        queryKey: ["program", slug],
        queryFn: () => fetchProgram(slug!),
        enabled: !!slug,
        staleTime: 1000 * 60 * 5
    })
}

export function useProgramOverview(slug?: string, enabled = false) {
    return useQuery({
        queryKey: ["program-overview", slug],
        queryFn: () => fetchProgramOverview(slug!),
        enabled: !!slug && enabled,
    })
}

export function useProgramCurriculum(slug?: string) {
    return useQuery({
        queryKey: ["program", "curriculum", slug],
        queryFn: () => getProgramCurriculum(slug!),
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 min cache
    })
}

export function useProgramCohorts(slug?: string) {
    return useQuery({
        queryKey: ["program", "cohorts", slug],
        queryFn: async () => {
            const res = await getProgramCohorts(slug!)
            return res.data.data
        },
        enabled: !!slug,
    })
}