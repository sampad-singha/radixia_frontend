import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function ExplorePagination({meta, params, setParams}: any) {

    if (!meta) return null

    const { current_page, last_page } = meta
    const pages = getVisiblePages(current_page, last_page)

    const goToPage = (page: number) => {
        if (page < 1 || page > last_page) return

        setParams((prev: any) => ({
            ...prev,
            page
        }))

        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <Pagination>

            <PaginationContent>

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => goToPage(current_page - 1)}
                        className={current_page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Pages */}
                {pages.map((page, i) => {

                    if (page === "...") {
                        return (
                            <PaginationItem key={`dots-${i}`}>
                                <span className="px-2 text-muted-foreground">...</span>
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === current_page}
                                onClick={() => goToPage(page as number)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => goToPage(current_page + 1)}
                        className={current_page === last_page ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

            </PaginationContent>

        </Pagination>
    )
}

function getVisiblePages(current: number, last: number) {
    const delta = 2
    const pages: (number | string)[] = []

    const left = Math.max(2, current - delta)
    const right = Math.min(last - 1, current + delta)

    pages.push(1)

    if (left > 2) {
        pages.push("...")
    }

    for (let i = left; i <= right; i++) {
        pages.push(i)
    }

    if (right < last - 1) {
        pages.push("...")
    }

    if (last > 1) {
        pages.push(last)
    }

    return pages
}