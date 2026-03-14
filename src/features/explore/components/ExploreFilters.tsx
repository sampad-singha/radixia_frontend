import React, {useState} from "react"
import {SlidersHorizontal, ChevronDown, Star} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {Slider} from "@/components/ui/slider"
import {Separator} from "@/components/ui/separator"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import type {ExploreParams} from "../types/explore.types"

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
        <div className="flex items-center gap-3">

            {/* SORT */}
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
                <SelectTrigger className="w-[160px]">
                    <SelectValue/>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low → High</SelectItem>
                    <SelectItem value="price_high">Price: High → Low</SelectItem>
                </SelectContent>
            </Select>

            {/* FILTER DRAWER */}
            <Drawer direction="right" handleOnly>

                <DrawerTrigger asChild>
                    <Button variant="outline" size="icon">
                        <SlidersHorizontal className="w-4 h-4"/>
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="fixed right-0 top-0 h-full w-[320px]">

                    <DrawerHeader className="px-6 pt-6">
                        <DrawerTitle>Filters</DrawerTitle>
                    </DrawerHeader>

                    <div className="px-6 pb-10 space-y-7 overflow-y-auto">

                        {/* PRICE */}
                        <div className="space-y-4">

                            <p className="text-sm font-semibold">Price</p>

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

                                <span className="text-muted-foreground text-xs">52</span>

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

                                <span className="text-muted-foreground text-xs">312</span>

                            </label>

                            <div className="space-y-3">

                                <p className="text-sm font-medium">Price Range</p>

                                <div onPointerDown={(e) => e.stopPropagation()}>
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
                                </div>

                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>BDT {params.price_min ?? 0}</span>
                                    <span>{params.price_max ? `BDT ${params.price_max}` : "BDT 25K+"}</span>
                                </div>

                            </div>

                        </div>

                        <Separator/>

                        {/* RATING */}
                        <div className="space-y-4">

                            <p className="text-sm font-semibold">Rating</p>

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

                        </div>

                        <Separator/>

                        {/* LEVEL */}
                        <div className="space-y-4">

                            <p className="text-sm font-semibold">Level</p>

                            {["beginner", "intermediate", "advanced"].map(level => (

                                <label key={level} className="flex justify-between text-sm">

                                    <div className="flex items-center gap-2">

                                        <Checkbox
                                            checked={params.level?.includes(level)}
                                            onCheckedChange={() =>
                                                toggleArrayValue("level", level)
                                            }
                                        />

                                        {level.charAt(0).toUpperCase() + level.slice(1)}

                                    </div>

                                </label>

                            ))}

                        </div>

                        <Separator/>

                        {/* LANGUAGE */}
                        <div className="space-y-4">

                            <p className="text-sm font-semibold">Language</p>

                            {["English", "Spanish", "Hindi"].map(lang => (

                                <label key={lang} className="flex justify-between text-sm">

                                    <div className="flex items-center gap-2">

                                        <Checkbox
                                            checked={params.language?.includes(lang)}
                                            onCheckedChange={() =>
                                                toggleArrayValue("language", lang)
                                            }
                                        />

                                        {lang}

                                    </div>

                                </label>

                            ))}

                        </div>

                        <Separator/>

                        {/* TOPICS */}
                        <div className="space-y-4">

                            <p className="text-sm font-semibold">Topics</p>

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
                                onClick={() => setShowAllTopics(!showAllTopics)}
                                className="flex items-center gap-1 text-sm text-primary"
                            >
                                {showAllTopics ? "Show less" : "Show more"}
                                <ChevronDown className="w-4 h-4"/>
                            </button>

                        </div>

                    </div>

                    <div className="sticky bottom-0 bg-background border-t p-4 flex gap-2">

                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={clearFilters}
                        >
                            Clear
                        </Button>

                        {/*<Button className="flex-1">*/}
                        {/*  Apply*/}
                        {/*</Button>*/}

                    </div>

                </DrawerContent>

            </Drawer>

        </div>
    )
}
