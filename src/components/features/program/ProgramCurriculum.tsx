import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function ProgramCurriculum() {
    return (
        <div className="space-y-6 max-w-3xl">

            <h2 className="text-xl font-semibold">
                Curriculum
            </h2>

            <Accordion type="single" collapsible className="w-full">

                {/* Module 1 */}
                <AccordionItem value="module-1">
                    <AccordionTrigger>
                        Module 1 — Foundations
                    </AccordionTrigger>

                    <AccordionContent>

                        <div className="divide-y border rounded-md">

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Introduction to the Program</span>
                                <span className="text-muted-foreground">6 min</span>
                            </div>

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Understanding Domain Driven Design</span>
                                <span className="text-muted-foreground">18 min</span>
                            </div>

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Entities vs Value Objects</span>
                                <span className="text-muted-foreground">22 min</span>
                            </div>

                        </div>

                    </AccordionContent>
                </AccordionItem>


                {/* Module 2 */}
                <AccordionItem value="module-2">
                    <AccordionTrigger>
                        Module 2 — Architecture Patterns
                    </AccordionTrigger>

                    <AccordionContent>

                        <div className="divide-y border rounded-md">

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Hexagonal Architecture Explained</span>
                                <span className="text-muted-foreground">25 min</span>
                            </div>

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Ports and Adapters</span>
                                <span className="text-muted-foreground">19 min</span>
                            </div>

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Application Services</span>
                                <span className="text-muted-foreground">24 min</span>
                            </div>

                        </div>

                    </AccordionContent>
                </AccordionItem>


                {/* Module 3 */}
                <AccordionItem value="module-3">
                    <AccordionTrigger>
                        Module 3 — Laravel Implementation
                    </AccordionTrigger>

                    <AccordionContent>

                        <div className="divide-y border rounded-md">

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Structuring Laravel for DDD</span>
                                <span className="text-muted-foreground">30 min</span>
                            </div>

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Repository Pattern</span>
                                <span className="text-muted-foreground">21 min</span>
                            </div>

                            <div className="flex justify-between px-4 py-3 text-sm">
                                <span>Service Layer Design</span>
                                <span className="text-muted-foreground">26 min</span>
                            </div>

                        </div>

                    </AccordionContent>
                </AccordionItem>

            </Accordion>

        </div>
    )
}