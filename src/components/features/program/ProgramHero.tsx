import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Globe, BarChart2, RefreshCw } from "lucide-react"

export default function ProgramHero() {
    return (
        <section className="border-b bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
                    <span className="hover:text-foreground cursor-pointer transition-colors">Catalog</span>
                    <span>/</span>
                    <span className="hover:text-foreground cursor-pointer transition-colors">Web Development</span>
                    <span>/</span>
                    <span className="hover:text-foreground cursor-pointer transition-colors">Laravel</span>
                </nav>

                {/* Category + Level badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs font-medium">Web Development</Badge>
                    <Badge variant="outline" className="text-xs font-medium">Advanced</Badge>
                    <Badge className="text-xs font-medium bg-amber-100 text-amber-800 hover:bg-amber-100 border-0">
                        Bestseller
                    </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3 max-w-3xl">
                    Laravel Advanced Patterns: Domain-Driven Design & Hexagonal Architecture
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-muted-foreground mb-5 max-w-2xl leading-relaxed">
                    Build enterprise-grade Laravel applications using DDD, CQRS, Event Sourcing, and Hexagonal Architecture.
                    Real-world projects, clean code principles, and patterns used in production systems.
                </p>

                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-5">
                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-amber-500">4.8</span>
                        <div className="flex items-center">
                            {[1, 2, 3, 4].map((i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 opacity-50" />
                        </div>
                        <span className="text-muted-foreground underline cursor-pointer hover:text-foreground">
                            (2,387 ratings)
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        <span>4,120 students enrolled</span>
                    </div>
                </div>

                {/* Instructor */}
                <p className="text-sm mb-5">
                    Created by{" "}
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                        Mehedi Hasan
                    </span>
                    {" "}and{" "}
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                        Radixia Academy
                    </span>
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" />
                        Last updated <strong className="text-foreground ml-1">March 2025</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        English
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        27.5 hours total
                    </span>
                    <span className="flex items-center gap-1.5">
                        <BarChart2 className="w-3.5 h-3.5" />
                        Advanced level
                    </span>
                </div>
            </div>
        </section>
    )
}