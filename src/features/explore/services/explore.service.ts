import { api } from "@/lib/api"
import type { ExploreParams, ExploreResponse } from "@/features/explore/types/explore.types"

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