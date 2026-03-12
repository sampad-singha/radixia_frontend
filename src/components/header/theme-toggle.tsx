import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const isDark = resolvedTheme === "dark"

    const toggle = () => setTheme(isDark ? "light" : "dark")

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="relative"
        >
            <Sun
                className={cn(
                    "absolute size-5 transition-all duration-300",
                    isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
                )}
            />

            <Moon
                className={cn(
                    "absolute size-5 transition-all duration-300",
                    isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                )}
            />

            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}