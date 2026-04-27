import {Button} from "@/components/ui/button.tsx"
import React from "react";
import type {ExploreParams} from "@/lib/types/explore.types.ts";

type Props = {
    params: ExploreParams
    setParams: React.Dispatch<React.SetStateAction<ExploreParams>>
}

const tabs: { label: string; value: NonNullable<ExploreParams["type"]> }[] = [
    {label: "All", value: "all"},
    {label: "Programs", value: "program"},
    {label: "Courses", value: "course"},
    {label: "Bootcamps", value: "bootcamp"},
    {label: "Specializations", value: "specialization"}
]

export default function ExploreTabs({params, setParams}: Props) {

    const currentType = params.type ?? "all"

    const changeType = (type: NonNullable<ExploreParams["type"]>) => {
        setParams(prev => ({
            ...prev,
            type,
            page: 1
        }))
    }

    return (
        <div className="flex gap-2 overflow-x-auto pb-1">

            {tabs.map(tab => (

                <Button
                    key={tab.value}
                    size="sm"
                    variant={currentType === tab.value ? "default" : "outline"}
                    onClick={() => changeType(tab.value)}
                >
                    {tab.label}
                </Button>

            ))}

        </div>
    )

}