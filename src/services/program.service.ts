import { api } from "@/lib/api.ts"

export async function fetchProgram(slug: string) {
    const { data } = await api.get(`/v1/catalog/programs/${slug}`)
    return data.data
}

export async function fetchProgramOverview(slug: string) {
    const { data } = await api.get(`/v1/catalog/programs/${slug}/overview`)
    return data.data
}

export async function getProgramCurriculum(slug: string) {
    const { data } = await api.get(`/v1/catalog/programs/${slug}/curriculum`)
    return data
}

export async function getProgramCohorts(slug: string) {
    return api.get(`/v1/catalog/programs/${slug}/cohorts`)
}