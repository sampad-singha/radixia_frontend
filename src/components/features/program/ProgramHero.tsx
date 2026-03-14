import { Button } from "@/components/ui/button"

export default function ProgramHero() {
    return (
        <div className="grid md:grid-cols-2 gap-8">

            <img
                src="https://xpicsum.photos/640/360"
                className="rounded-lg w-full"
            />

            <div className="space-y-4">

                <h1 className="text-3xl font-semibold">
                    Laravel Advanced Patterns
                </h1>

                <p className="text-muted-foreground">
                    Deep dive into Domain Driven Design and Hexagonal Architecture with Laravel.
                </p>

                <p className="text-sm">
                    By Expert Instructor
                </p>

                <div className="flex items-center gap-2 text-sm">
                    ⭐ 4.8
                    <span className="text-muted-foreground">
                        (2387 reviews)
                    </span>
                </div>

                <div className="text-xl font-semibold">
                    $300
                </div>

                <Button>
                    Enroll Now
                </Button>

            </div>

        </div>
    )
}