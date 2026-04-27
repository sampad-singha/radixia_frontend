import { api } from "@/lib/api.ts"
import type { ExploreParams, ExploreResponse } from "@/lib/types/explore.types.ts"

export async function fetchExplore(params: ExploreParams) {

    const cleanParams = { ...params }

    // backend expects no "type" when showing all
    if (cleanParams.type === "all") {
        delete cleanParams.type
    }

    const { data } = await api.get<ExploreResponse>(
        "/v1/catalog",
        { params: cleanParams }
    )

    return data.data
}