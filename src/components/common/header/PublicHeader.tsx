import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/header/theme-toggle"
import { useAuth } from "@/context/AuthContext"

export default function PublicHeader() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <header className="sticky top-0 border-b px-6 z-40 bg-background/95 backdrop-blur">
            <div className="h-16 px-6 flex items-center justify-between max-w-7xl mx-auto">

                {/* Logo */}
                <Link to="/" className="text-lg font-semibold">
                    Radixia
                </Link>

                {/* Nav */}
                <nav className="flex items-center gap-6 text-sm font-medium">

                    <Link
                        to="/explore"
                        className="text-muted-foreground hover:text-foreground transition"
                    >
                        Explore
                    </Link>

                    {!isLoading && (
                        isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="text-muted-foreground hover:text-foreground transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="text-muted-foreground hover:text-foreground transition"
                                >
                                    Sign Up
                                </Link>

                                <Link to="/login">
                                    <Button size="sm">
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )
                    )}

                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}