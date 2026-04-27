import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import type { ExploreParams } from "@/lib/types/explore.types"
import React from "react";

type Props = {
    params: ExploreParams
    setParams: React.Dispatch<React.SetStateAction<ExploreParams>>
}

export default function ExploreSort({ params, setParams }: Props) {

    return (
        <Select
            value={params.sort ?? "popular"}
            onValueChange={(value) =>
                setParams(prev => ({
                    ...prev,
                    sort: value as ExploreParams["sort"],
                    page: 1
                }))
            }
        >
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price_low">Price: Low → High</SelectItem>
                <SelectItem value="price_high">Price: High → Low</SelectItem>
            </SelectContent>
        </Select>
    )
}