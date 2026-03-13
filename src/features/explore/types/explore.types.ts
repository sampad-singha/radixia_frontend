export type ExploreItem = {
    id: string
    title: string
    slug: string
    short_description: string | null

    level: "beginner" | "intermediate" | "advanced"

    thumbnail_url: string | null

    lesson_count: number
    duration_minutes: number
    enrollments_count: number

    cohort_price: number

    instructor: {
        id: string
        name: string
    }
}

export type ExplorePaginator = {
    current_page: number
    data: ExploreItem[]
    last_page: number
    per_page: number
    total: number
}

export type ExploreResponse = {
    data: ExplorePaginator
}

export type ExploreParams = {
    page?: number
    q?: string

    type?: "program" | "course" | "bootcamp" | "specialization" | "all"

    sort?: "popular" | "newest" | "rating" | "price_low" | "price_high"

    price_type?: "free" | "paid"
    price_min?: number
    price_max?: number

    rating_min?: number

    level?: ("beginner" | "intermediate" | "advanced")[]
    language?: string[]

    duration?: "short" | "medium" | "long"

    topics?: string[]
}