import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useSidebar} from "@/components/ui/sidebar.tsx";
import {ThemeToggle} from "@/components/header/theme-toggle.tsx";

export function Header() {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="sticky top-0 flex h-16 items-center justify-between border-b px-6 z-40 bg-background/95 backdrop-blur">
            <input
                type="text"
                name="username"
                autoComplete="username"
                className="hidden"
            />

            {/* Left side */}
            <div className="flex items-center gap-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-5"/>
                </Button>

                <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
                    Radixia
                </div>
            </div>

            {/* Search */}
            <div className="flex w-full max-w-sm items-center gap-2">
                <Search className="size-4 text-muted-foreground"/>
                <Input
                    type="search"
                    placeholder="Search..."
                    className="h-9"
                    name="search"
                />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>

        </header>
    )
}