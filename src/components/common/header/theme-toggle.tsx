import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils.ts"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [animatingToDark, setAnimatingToDark] = useState<boolean | null>(null)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const isDark = resolvedTheme === "dark"

    const toggle = () => {
        const nextDark = !isDark
        setAnimatingToDark(nextDark)

        setTimeout(() => {
            setTheme(nextDark ? "dark" : "light")
            setAnimatingToDark(null)
        }, 250)
    }

    const darkState =
        animatingToDark === null ? isDark : animatingToDark

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="relative"
        >
            <Sun
                className={cn(
                    "absolute size-5 transition-transform duration-300",
                    darkState ? "-rotate-90 scale-0" : "rotate-0 scale-100"
                )}
            />

            <Moon
                className={cn(
                    "absolute size-5 transition-transform duration-300",
                    darkState ? "rotate-0 scale-100" : "rotate-90 scale-0"
                )}
            />

            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}