import { CheckCircle2, AlertCircle, User2, Target } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const learningOutcomes = [
    "Apply Domain-Driven Design principles to real Laravel projects",
    "Structure applications using Hexagonal (Ports & Adapters) Architecture",
    "Implement CQRS — separating command and query responsibilities",
    "Build event-driven systems with Event Sourcing in Laravel",
    "Write clean, testable, and maintainable PHP code",
    "Design bounded contexts and aggregate roots correctly",
    "Use repositories and specifications to abstract persistence",
    "Integrate third-party services without coupling your domain",
    "Write unit, integration, and acceptance tests confidently",
    "Refactor legacy Laravel apps toward cleaner architecture",
]

const prerequisites = [
    "Solid understanding of PHP (OOP required)",
    "Experience with Laravel 10+ (routes, Eloquent, controllers)",
    "Familiarity with Composer and PSR standards",
    "Basic knowledge of design patterns (SOLID principles recommended)",
]

const targetAudience = [
    "Laravel developers who want to move beyond tutorials into production architecture",
    "Backend engineers building complex, long-lived SaaS or enterprise applications",
    "Tech leads looking for a consistent architectural playbook for their team",
    "Developers frustrated with spaghetti code and seeking structured solutions",
]

export default function ProgramOverview() {
    return (
        <div className="space-y-10">
            {/* What You'll Learn */}
            <section>
                <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
                <div className="border rounded-lg p-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {learningOutcomes.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            {/* Requirements / Prerequisites */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2.5">
                    {prerequisites.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <Separator />

            {/* Who This Is For */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Who this is for</h2>
                <ul className="space-y-2.5">
                    {targetAudience.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                            <Target className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <Separator />

            {/* Course Description */}
            <section>
                <h2 className="text-xl font-semibold mb-3">About this course</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                    <p>
                        This is not another CRUD tutorial. This course tackles the real challenge most Laravel developers hit
                        around year two — when the codebase gets large enough that simple MVC patterns start breaking down.
                        You need architectural thinking, and this course gives you exactly that.
                    </p>
                    <p>
                        We cover Domain-Driven Design from first principles, then apply it specifically to Laravel's ecosystem.
                        You'll implement bounded contexts, aggregates, domain events, and repositories — and you'll see how
                        these concepts map onto real Laravel code, not just theory.
                    </p>
                    <p>
                        Every module builds on the last, culminating in a fully-structured multi-tenant SaaS application built
                        using everything you've learned. All code is available on GitHub, and every decision is explained with
                        trade-offs in mind.
                    </p>
                </div>
            </section>

            <Separator />

            {/* Instructor */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Your instructor</h2>
                <Card className="shadow-none">
                    <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16 border">
                                <AvatarImage src="/placeholder-instructor.jpg" alt="Mehedi Hasan" />
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
                                    <span>⭐ 4.9 instructor rating</span>
                                    <span>👥 12,400+ students</span>
                                    <span>🎓 6 courses</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Mehedi has spent 8+ years building production Laravel applications for startups and enterprises.
                                    He's passionate about clean code, architectural patterns, and making advanced concepts
                                    accessible to working developers. His courses are known for their practical depth and zero fluff.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}