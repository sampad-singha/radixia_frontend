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
    Video,
} from "lucide-react"
import React from "react";

type Feature = {
    content: string
    icon: string
}

type Props = {
    data: any
}

const featureIconMap: Record<string, React.ElementType> = {
    Video,
    Award,
    Clock,
    BookOpen,
    Wifi,
    RefreshCw,
    ShieldCheck,
}

export default function ProgramSidebar({ data }: Props) {

    const { pricing, features, previewVideo } = data as {
        pricing: any
        features: Feature[]
        previewVideo: any
    }

    return (
        <aside className="space-y-4 lg:sticky lg:top-24 h-fit">

            {/* Video Preview */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden border">
                {previewVideo?.path ? (
                    <video
                        src={previewVideo.path}
                        poster={previewVideo.thumbnail}
                        controls
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No preview available
                    </div>
                )}
            </div>

            {/* Enroll Card */}
            <div className="border rounded-lg overflow-hidden">

                {/* Price */}
                <div className="p-5 space-y-3">

                    <div className="flex items-end gap-2.5">
                        <span className="text-3xl font-bold">
                            {pricing?.currency} {pricing?.price}
                        </span>

                        {pricing?.originalPrice && (
                            <span className="text-base text-muted-foreground line-through mb-0.5">
                                {pricing.currency} {pricing.originalPrice}
                            </span>
                        )}

                        {pricing?.discountPercent && (
                            <Badge className="mb-0.5 bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs font-semibold">
                                {pricing.discountPercent}% OFF
                            </Badge>
                        )}
                    </div>

                    {/* Urgency */}
                    {pricing?.offerEnds && (
                        <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Offer ends {pricing.offerEnds}</span>
                        </div>
                    )}

                    {/* CTA */}
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

                    {features?.map((feature) => {
                        const Icon =
                            featureIconMap[feature.icon?.trim()] || CheckCircle2

                        return (
                            <div key={feature.content} className="flex items-center gap-2.5 text-sm">
                                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                                <span>{feature.content}</span>
                            </div>
                        )
                    })}
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

            {/* Extras */}
            {/*<div className="border rounded-lg p-4 space-y-2 bg-muted/30">*/}
            {/*    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">*/}
            {/*        Cohort extras*/}
            {/*    </p>*/}

            {/*    {[*/}
            {/*        "Live sessions twice a week",*/}
            {/*        "Private Discord community",*/}
            {/*        "2× 1-on-1 code reviews",*/}
            {/*        "Access to all recordings",*/}
            {/*    ].map((item) => (*/}
            {/*        <div key={item} className="flex items-center gap-2 text-sm">*/}
            {/*            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />*/}
            {/*            <span>{item}</span>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

        </aside>
    )
}