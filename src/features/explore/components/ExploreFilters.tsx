import { useState } from "react"
import { SlidersHorizontal, ChevronDown, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

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

export default function ExploreFilters() {

  const [showAllTopics, setShowAllTopics] = useState(false)

  const topics = [
    { name: "Web Development", count: 312 },
    { name: "Laravel", count: 121 },
    { name: "React", count: 288 },
    { name: "DevOps", count: 96 },
    { name: "System Design", count: 71 },
    { name: "Microservices", count: 54 },
    { name: "Testing", count: 43 },
    { name: "Architecture", count: 32 }
  ]

  const visibleTopics = showAllTopics ? topics : topics.slice(0, 5)

  return (
    <div className="flex items-center gap-3">

      {/* Sort */}
      <Select defaultValue="popular">
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="price-low">Price: Low → High</SelectItem>
          <SelectItem value="price-high">Price: High → Low</SelectItem>
        </SelectContent>
      </Select>

      {/* Filters */}
      <Drawer direction="right" handleOnly>

        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="fixed right-0 top-0 h-full w-[320px]">

          <DrawerHeader className="px-6 pt-6">
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>

          <div className="px-6 pb-10 space-y-7 overflow-y-auto">

            {/* Price */}
            <div className="space-y-4">

              <div className="flex justify-between">
                <p className="text-sm font-semibold">Price</p>
              </div>

              <div className="space-y-3">

                <label className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    Free
                  </div>
                  <span className="text-muted-foreground text-xs">52</span>
                </label>

                <label className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    Paid
                  </div>
                  <span className="text-muted-foreground text-xs">312</span>
                </label>

              </div>

              {/* Price Range */}
              <div className="space-y-3">

                <p className="text-sm font-medium">Price Range</p>

                <Slider defaultValue={[20]} max={200} step={1} />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$200+</span>
                </div>

              </div>

            </div>

            <Separator />

            {/* Rating */}
            <div className="space-y-4">

              <p className="text-sm font-semibold">Rating</p>

              {[4.5, 4, 3.5].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center justify-between text-sm"
                >

                  <div className="flex items-center gap-2">

                    <Checkbox />

                    <div className="flex items-center gap-1">

                      {[1,2,3,4,5].map(i => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
  i <= Math.floor(rating)
      ? "fill-amber-500 text-amber-500"
      : "text-muted-foreground"
}`}
                        />
                      ))}

                      <span className="text-muted-foreground text-xs ml-1">
                        & up
                      </span>

                    </div>

                  </div>

                  <span className="text-muted-foreground text-xs">
                    182
                  </span>

                </label>
              ))}

            </div>

            <Separator />

            {/* Level */}
            <div className="space-y-4">

              <p className="text-sm font-semibold">Level</p>

              {[
                {name:"Beginner",count:210},
                {name:"Intermediate",count:148},
                {name:"Advanced",count:54}
              ].map(level => (
                <label
                  key={level.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    {level.name}
                  </div>

                  <span className="text-muted-foreground text-xs">
                    {level.count}
                  </span>
                </label>
              ))}

            </div>

            <Separator />

            {/* Language */}
            <div className="space-y-4">

              <p className="text-sm font-semibold">Language</p>

              {[
                {name:"English",count:402},
                {name:"Spanish",count:53},
                {name:"Hindi",count:41}
              ].map(lang => (
                <label
                  key={lang.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    {lang.name}
                  </div>

                  <span className="text-muted-foreground text-xs">
                    {lang.count}
                  </span>
                </label>
              ))}

            </div>

            <Separator />

            {/* Topics */}
            <div className="space-y-4">

              <p className="text-sm font-semibold">Topics</p>

              {visibleTopics.map(topic => (

                <label
                  key={topic.name}
                  className="flex items-center justify-between text-sm"
                >

                  <div className="flex items-center gap-2">
                    <Checkbox />
                    {topic.name}
                  </div>

                  <span className="text-muted-foreground text-xs">
                    {topic.count}
                  </span>

                </label>

              ))}

              <button
                onClick={() => setShowAllTopics(!showAllTopics)}
                className="flex items-center gap-1 text-sm text-primary"
              >
                {showAllTopics ? "Show less" : "Show more"}
                <ChevronDown className="w-4 h-4" />
              </button>

            </div>

          </div>

          <div className="sticky bottom-0 bg-background border-t p-4 flex gap-2">
            <Button variant="outline" className="flex-1">
              Clear
            </Button>
            <Button className="flex-1">
              Apply
            </Button>
          </div>

        </DrawerContent>

      </Drawer>

    </div>
  )
}
