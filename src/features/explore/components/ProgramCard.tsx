import { Star, Clock, ListVideo } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export default function ProgramCard() {
  return (
    <Link
      to="/programs/laravel-advanced-patterns"
      className="block group"
    >

      <div className="flex items-start gap-5 px-4 py-4 border-b transition-colors hover:bg-muted/40">

        {/* Thumbnail */}
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900"
          alt="Laravel Advanced Patterns"
          className="w-64 h-40 object-cover flex-shrink-0"
        />

        {/* Content */}
        <div className="flex flex-col flex-1 gap-2">

          {/* Title + Price */}
          <div className="flex items-start justify-between">

            <h3 className="text-lg font-semibold leading-tight">
              Laravel Advanced Patterns
            </h3>

            <span className="text-l font-bold">
              BDT 12500
            </span>

          </div>

          {/* Short description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            Deep dive into Domain-Driven Design, Hexagonal architecture,
            and scalable Laravel design patterns used in production systems.
          </p>

          {/* Instructors */}
          <p className="text-sm text-muted-foreground">
            John Doe • Jane Smith
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">

            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-amber-500" />
              4.8
            </div>

            <span className="text-muted-foreground">
              (1,245 ratings)
            </span>

          </div>

          {/* Duration + lessons */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              18 hrs
            </div>

            <div className="flex items-center gap-1">
              <ListVideo className="w-4 h-4" />
              42 lessons
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
