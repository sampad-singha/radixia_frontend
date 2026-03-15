import {Card, CardContent} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge.tsx";
import {GraduationCap, Star, Users} from "lucide-react";

export default function Instructor() {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Your instructor</h2>
            <Card className="shadow-none">
                <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16 border">
                            <AvatarImage src="/placeholder-instructor.jpg" alt="Mehedi Hasan"/>
                            <AvatarFallback className="text-lg font-semibold">MH</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <p className="font-semibold text-base">Mehedi Hasan</p>
                                <Badge variant="secondary" className="text-xs">Lead Instructor</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                Senior Software Engineer · Laravel Core Contributor · DDD Practitioner
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground mb-3">

                                <span className="flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-amber-500" />
                                    4.9 instructor rating
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-blue-500" />
                                    12,400+ students
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-green-500" />
                                    6 courses
                                </span>

                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Mehedi has spent 8+ years building production Laravel applications for startups and
                                enterprises.
                                He's passionate about clean code, architectural patterns, and making advanced concepts
                                accessible to working developers. His courses are known for their practical depth and
                                zero fluff.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};