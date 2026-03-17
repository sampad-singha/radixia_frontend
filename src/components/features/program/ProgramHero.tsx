import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Globe, BarChart2, RefreshCw } from "lucide-react"

type Props = {
    data: any
}

export default function ProgramHero({ data }: Props) {

    const {
        title,
        subtitle,
        category,
        topic,
        level,
        rating,
        studentsCount,
        instructor,
        updatedAt,
        language,
        stats,
        badges
    } = data

    return (
        <section className="border-b bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Breadcrumb */}
                <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
                    <span className="hover:text-foreground cursor-pointer transition-colors">Catalog</span>
                    {category?.name && (
                        <>
                            <span>/</span>
                            <span className="hover:text-foreground cursor-pointer transition-colors">
                                {category.name}
                            </span>
                        </>
                    )}
                    {topic?.name && (
                        <>
                            <span>/</span>
                            <span className="hover:text-foreground cursor-pointer transition-colors">
                                {topic.name}
                            </span>
                        </>
                    )}
                </nav>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {category?.name && (
                        <Badge variant="secondary" className="text-xs font-medium">
                            {category.name}
                        </Badge>
                    )}

                    {level && (
                        <Badge variant="outline" className="text-xs font-medium capitalize">
                            {level}
                        </Badge>
                    )}

                    {badges?.map((b: string) => (
                        <Badge
                            key={b}
                            className="text-xs font-medium bg-amber-100 text-amber-800 hover:bg-amber-100 border-0"
                        >
                            {b}
                        </Badge>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3 max-w-3xl">
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-lg text-muted-foreground mb-5 max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                )}

                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-5">

                    {rating && (
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-amber-500">
                                {rating.average}
                            </span>

                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                            i < Math.round(rating.average)
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-amber-400 opacity-30"
                                        }`}
                                    />
                                ))}
                            </div>

                            <span className="text-muted-foreground underline cursor-pointer hover:text-foreground">
                                ({rating.count} ratings)
                            </span>
                        </div>
                    )}

                    {studentsCount && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="w-3.5 h-3.5" />
                            <span>{studentsCount} students enrolled</span>
                        </div>
                    )}
                </div>

                {/* Instructor */}
                {instructor?.name && (
                    <p className="text-sm mb-5">
                        Created by{" "}
                        <span className="text-primary font-medium hover:underline cursor-pointer">
                            {instructor.name}
                        </span>
                    </p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">

                    {updatedAt && (
                        <span className="flex items-center gap-1.5">
                            <RefreshCw className="w-3.5 h-3.5" />
                            Last updated{" "}
                            <strong className="text-foreground ml-1">
                                {updatedAt}
                            </strong>
                        </span>
                    )}

                    {language && (
                        <span className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" />
                            {language}
                        </span>
                    )}

                    {stats?.durationHours && (
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {stats.durationHours} hours total
                        </span>
                    )}

                    {level && (
                        <span className="flex items-center gap-1.5">
                            <BarChart2 className="w-3.5 h-3.5" />
                            {level} level
                        </span>
                    )}
                </div>

            </div>
        </section>
    )
}