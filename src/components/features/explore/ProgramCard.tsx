import {Star, Clock, ListVideo, BarChart} from "lucide-react"
import { Badge } from "@/components/ui/badge.tsx"
import { Link } from "react-router-dom"

export default function ProgramCard({ item }: any) {
  return (
      <Link
          to={`/program/${item.slug}`}
          className="block group"
      >

      <div className="flex items-start gap-5 px-4 py-4 border-b transition-colors hover:bg-muted/40">

        {/* Thumbnail */}
        <img
          src={item.thumbnail_url}
          alt={item.title}
          className="w-64 h-40 object-cover flex-shrink-0"
        />

        {/* Content */}
        <div className="flex flex-col flex-1 gap-2">

          {/* Title + Price */}
          <div className="flex items-start justify-between">

            <h3 className="text-lg font-semibold leading-tight">
              {item.title}
            </h3>

            <span className="text-l font-bold">
              BDT {item.price}
            </span>

          </div>

          {/* Short description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.short_description}
          </p>

          {/* Instructors */}
          <p className="text-sm text-muted-foreground">
            {item.instructor.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">

            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-amber-500" />
              {item.rating}
            </div>

            <span className="text-muted-foreground">
              ({item.rating_count} ratings)
            </span>

          </div>

          {/* Duration + lessons */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {item.duration_hours} hours
            </div>

            <div className="flex items-center gap-1">
              <ListVideo className="w-4 h-4" />
              {item.lesson_count} lessons
            </div>

            <div className="flex items-center gap-1">
              <BarChart className="w-4 h-4" />
              <span className="capitalize">{item.level}</span>
            </div>

          </div>

          {/* Tags */}
          <div className="flex gap-2 pt-1 flex-wrap">

            <Badge variant="secondary">
              Program
            </Badge>

            <Badge variant="outline">
              Bestseller
            </Badge>

            <Badge variant="outline">
              Featured
            </Badge>

          </div>

        </div>

      </div>

    </Link>
  )
}
