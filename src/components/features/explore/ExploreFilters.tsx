import React, {useState} from "react"
import {ChevronDown, Star} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Slider} from "@/components/ui/slider"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"

import type {ExploreParams} from "@/lib/types/explore.types"

type Props = {
    params: ExploreParams
    setParams: React.Dispatch<React.SetStateAction<ExploreParams>>
}

export default function ExploreFilters({params, setParams}: Props) {

    const [showAllTopics, setShowAllTopics] = useState(false)

    const topics = [
        {name: "Web Development", count: 312},
        {name: "Laravel", count: 121},
        {name: "React", count: 288},
        {name: "DevOps", count: 96},
        {name: "System Design", count: 71},
        {name: "Microservices", count: 54},
        {name: "Testing", count: 43},
        {name: "Architecture", count: 32}
    ]

    const visibleTopics = showAllTopics ? topics : topics.slice(0, 5)

    const toggleArrayValue = (key: keyof ExploreParams, value: string) => {

        const current = (params[key] as string[]) ?? []

        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value]

        setParams(prev => ({
            ...prev,
            [key]: updated,
            page: 1
        }))
    }

    const clearFilters = () => {
        setParams({
            page: 1,
            type: "all",
            sort: "popular"
        })
    }

    return (
        <div className="space-y-6">

            <Accordion type="multiple" defaultValue={["price", "rating", "level"]}>

                {/* PRICE */}
                <AccordionItem value="price">

                    <AccordionTrigger>
                        Price
                    </AccordionTrigger>

                    <AccordionContent className="space-y-4">

                        <label className="flex justify-between text-sm">

                            <div className="flex items-center gap-2">

                                <Checkbox
                                    checked={params.price_type === "free"}
                                    onCheckedChange={() =>
                                        setParams(prev => ({
                                            ...prev,
                                            price_type:
                                                prev.price_type === "free" ? undefined : "free",
                                            page: 1
                                        }))
                                    }
                                />

                                Free

                            </div>

                            <span className="text-xs text-muted-foreground">
                52
              </span>

                        </label>

                        <label className="flex justify-between text-sm">

                            <div className="flex items-center gap-2">

                                <Checkbox
                                    checked={params.price_type === "paid"}
                                    onCheckedChange={() =>
                                        setParams(prev => ({
                                            ...prev,
                                            price_type:
                                                prev.price_type === "paid" ? undefined : "paid",
                                            page: 1
                                        }))
                                    }
                                />

                                Paid

                            </div>

                            <span className="text-xs text-muted-foreground">312</span>

                        </label>

                        <div className="space-y-3">

                            <p className="text-sm font-medium">
                                Price Range
                            </p>

                            <Slider
                                value={[
                                    params.price_min ?? 0,
                                    params.price_max ?? 25000
                                ]}
                                min={0}
                                max={25000}
                                step={500}
                                onValueChange={(v) =>
                                    setParams(prev => ({
                                        ...prev,
                                        price_min: v[0],
                                        price_max: v[1] === 25000 ? undefined : v[1],
                                        page: 1
                                    }))
                                }
                            />

                            <div className="flex justify-between text-xs text-muted-foreground">

                <span>
                  BDT {params.price_min ?? 0}
                </span>

                                <span>
                  {params.price_max
                      ? `BDT ${params.price_max}`
                      : "BDT 25K+"}
                </span>

                            </div>

                        </div>

                    </AccordionContent>

                </AccordionItem>


                {/* RATING */}
                <AccordionItem value="rating">

                    <AccordionTrigger>
                        Rating
                    </AccordionTrigger>

                    <AccordionContent className="space-y-3">

                        {[4.5, 4, 3.5].map(rating => (

                            <label
                                key={rating}
                                className="flex justify-between text-sm"
                            >

                                <div className="flex items-center gap-2">

                                    <Checkbox
                                        checked={params.rating_min === rating}
                                        onCheckedChange={() =>
                                            setParams(prev => ({
                                                ...prev,
                                                rating_min:
                                                    prev.rating_min === rating ? undefined : rating,
                                                page: 1
                                            }))
                                        }
                                    />

                                    <div className="flex items-center gap-1">

                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i <= Math.floor(rating)
                                                        ? "fill-amber-500 text-amber-500"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                        ))}

                                        <span className="text-xs text-muted-foreground ml-1">
                      & up
                    </span>

                                    </div>

                                </div>

                                <span className="text-xs text-muted-foreground">
                  182
                </span>

                            </label>

                        ))}

                    </AccordionContent>

                </AccordionItem>


                {/* LEVEL */}
                <AccordionItem value="level">

                    <AccordionTrigger>
                        Level
                    </AccordionTrigger>

                    <AccordionContent className="space-y-3">

                        {["beginner", "intermediate", "advanced"].map(level => (

                            <label
                                key={level}
                                className="flex items-center gap-2 text-sm"
                            >

                                <Checkbox
                                    checked={params.level?.includes(level)}
                                    onCheckedChange={() =>
                                        toggleArrayValue("level", level)
                                    }
                                />

                                {level.charAt(0).toUpperCase() + level.slice(1)}

                            </label>

                        ))}

                    </AccordionContent>

                </AccordionItem>


                {/* LANGUAGE */}
                <AccordionItem value="language">

                    <AccordionTrigger>
                        Language
                    </AccordionTrigger>

                    <AccordionContent className="space-y-3">

                        {["English", "Spanish", "Hindi"].map(lang => (

                            <label
                                key={lang}
                                className="flex items-center gap-2 text-sm"
                            >

                                <Checkbox
                                    checked={params.language?.includes(lang)}
                                    onCheckedChange={() =>
                                        toggleArrayValue("language", lang)
                                    }
                                />

                                {lang}

                            </label>

                        ))}

                    </AccordionContent>

                </AccordionItem>


                {/* TOPICS */}
                <AccordionItem value="topics">

                    <AccordionTrigger>
                        Topics
                    </AccordionTrigger>

                    <AccordionContent className="space-y-3">

                        {visibleTopics.map(topic => (

                            <label
                                key={topic.name}
                                className="flex justify-between text-sm"
                            >

                                <div className="flex items-center gap-2">

                                    <Checkbox
                                        checked={params.topics?.includes(topic.name)}
                                        onCheckedChange={() =>
                                            toggleArrayValue("topics", topic.name)
                                        }
                                    />

                                    {topic.name}

                                </div>

                                <span className="text-xs text-muted-foreground">
                  {topic.count}
                </span>

                            </label>

                        ))}

                        <button
                            onClick={() =>
                                setShowAllTopics(!showAllTopics)
                            }
                            className="flex items-center gap-1 text-sm text-primary"
                        >

                            {showAllTopics ? "Show less" : "Show more"}

                            <ChevronDown className="w-4 h-4"/>

                        </button>

                    </AccordionContent>

                </AccordionItem>

            </Accordion>

            <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
            >
                Clear Filters
            </Button>

        </div>
    )
}