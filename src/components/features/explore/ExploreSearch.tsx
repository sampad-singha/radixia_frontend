import React, {useEffect, useState} from "react"
import {Input} from "@/components/ui/input.tsx"
import {Search} from "lucide-react"
import type {ExploreParams} from "../../../lib/types/explore.types.ts"

type Props = {
    params: ExploreParams
    setParams: React.Dispatch<React.SetStateAction<ExploreParams>>
}

export default function ExploreSearch({params, setParams}: Props) {

    const [value, setValue] = useState(params.q ?? "")

    useEffect(() => {
        const timer = setTimeout(() => {

            setParams(prev => ({
                ...prev,
                q: value || undefined,
                page: 1
            }))

        }, 400)

        return () => clearTimeout(timer)

    }, [value, setParams])

    return (

        <div className="relative max-w-md w-full">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search programs, courses, bootcamps..."
                className="pl-9"
            />

        </div>

    )

}