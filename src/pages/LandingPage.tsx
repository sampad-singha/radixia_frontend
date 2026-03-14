import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button.tsx"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">

            {/* Navbar */}
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">

                    <Link to="/" className="text-lg font-semibold">
                        Radixia
                    </Link>

                    <div className="flex items-center gap-3">

                        <Button asChild variant="ghost">
                            <Link to="/login">Login</Link>
                        </Button>

                        <Button asChild>
                            <Link to="/register">Register</Link>
                        </Button>

                    </div>

                </div>
            </header>

            {/* Hero */}
            <main className="flex flex-1 items-center justify-center px-6">

                <div className="max-w-xl text-center space-y-6">

                    <h1 className="text-3xl font-bold tracking-tight">
                        Secure Authentication for Radixia
                    </h1>

                    <p className="text-muted-foreground">
                        A modern authentication system with multi-factor security,
                        recovery codes, and session management.
                    </p>

                    <div className="flex justify-center gap-4">

                        <Button asChild size="lg">
                            <Link to="/register">Get Started</Link>
                        </Button>

                        <Button asChild variant="outline" size="lg">
                            <Link to="/login">Sign In</Link>
                        </Button>

                    </div>

                </div>

            </main>

        </div>
    )
}