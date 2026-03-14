import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    CheckCircle2,
    Clock,
    BookOpen,
    Award,
    Wifi,
    RefreshCw,
    Share2,
    Heart,
    Tag,
    ShieldCheck,
} from "lucide-react"

const features = [
    { icon: Clock, text: "27.5 hours of video content" },
    { icon: BookOpen, text: "120 lessons across 8 modules" },
    { icon: Wifi, text: "Full lifetime access" },
    { icon: RefreshCw, text: "Access to all future updates" },
    { icon: Award, text: "Certificate of completion" },
    { icon: ShieldCheck, text: "7-day money-back guarantee" },
]

export default function ProgramSidebar() {
    return (
        <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
            {/* Video Preview */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden border">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Course preview"
                    allowFullScreen
                />
            </div>

            {/* Enroll Card */}
            <div className="border rounded-lg overflow-hidden">
                {/* Price block */}
                <div className="p-5 space-y-3">
                    <div className="flex items-end gap-2.5">
                        <span className="text-3xl font-bold">$300</span>
                        <span className="text-base text-muted-foreground line-through mb-0.5">$450</span>
                        <Badge className="mb-0.5 bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs font-semibold">
                            33% OFF
                        </Badge>
                    </div>

                    {/* Urgency */}
                    <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Cohort 7 offer ends March 31</span>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-2 pt-1">
                        <Button className="w-full" size="lg">
                            Enroll Now
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                            Try Free Preview
                        </Button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                        7-day money-back guarantee. No questions asked.
                    </p>
                </div>

                <Separator />

                {/* Features */}
                <div className="p-5 space-y-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                        This course includes
                    </p>
                    {features.map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2.5 text-sm">
                            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Share + Wishlist */}
                <div className="p-5 flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="flex-1 gap-2 text-sm">
                        <Heart className="w-4 h-4" />
                        Wishlist
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 gap-2 text-sm">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                </div>
            </div>

            {/* What's Included Summary */}
            <div className="border rounded-lg p-4 space-y-2 bg-muted/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Cohort 7 extras
                </p>
                {[
                    "Live sessions twice a week",
                    "Private Discord community",
                    "2× 1-on-1 code reviews",
                    "Access to all recordings",
                ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </aside>
    )
}