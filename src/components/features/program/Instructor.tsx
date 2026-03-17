import { Card, CardContent } from "@/components/ui/card.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge.tsx"
import { GraduationCap, Star, Users } from "lucide-react"

type Props = {
    data: {
        name?: string
        title?: string
        avatar?: string | null
        bio?: string
        rating?: number
        students?: number
        courses?: number
    }
}

export default function Instructor({ data }: Props) {

    const initials = data?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Your instructor</h2>

            <Card className="shadow-none">
                <CardContent className="p-5">

                    <div className="flex items-start gap-4">

                        <Avatar className="w-16 h-16 border">
                            {data?.avatar && (
                                <AvatarImage
                                    src={data.avatar}
                                    alt={data.name}
                                />
                            )}
                            <AvatarFallback className="text-lg font-semibold">
                                {initials || "NA"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">

                            {/* Name + Badge */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <p className="font-semibold text-base">
                                    {data?.name || "Unknown Instructor"}
                                </p>

                                <Badge variant="secondary" className="text-xs">
                                    Instructor
                                </Badge>
                            </div>

                            {/* Title */}
                            {data?.title && (
                                <p className="text-sm text-muted-foreground mb-3">
                                    {data.title}
                                </p>
                            )}

                            {/* Stats */}
                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground mb-3">

                                {data?.rating !== undefined && (
                                    <span className="flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5 text-amber-500" />
                                        {data.rating} instructor rating
                                    </span>
                                )}

                                {data?.students !== undefined && (
                                    <span className="flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-blue-500" />
                                        {data.students} students
                                    </span>
                                )}

                                {data?.courses !== undefined && (
                                    <span className="flex items-center gap-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-green-500" />
                                        {data.courses} courses
                                    </span>
                                )}

                            </div>

                            {/* Bio */}
                            {data?.bio && (
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {data.bio}
                                </p>
                            )}

                        </div>
                    </div>

                </CardContent>
            </Card>
        </section>
    )
}