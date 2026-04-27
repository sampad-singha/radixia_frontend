import React, { useState } from "react"
import { useLogin } from "@/queries/auth/auth.queries.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {Link, useNavigate} from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import GoogleLoginButton from "@/components/features/auth/GoogleLoginButton.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function LoginPage() {

    const loginMutation = useLogin()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setError(null)

        loginMutation.mutate(
            { email, password },
            {
                onSuccess: async (data) => {

                    if (data.mfa_required) {

                        sessionStorage.setItem(
                            "mfa_data",
                            JSON.stringify({
                                methods: data.available_methods,
                                defaultMethod: data.default_method,
                                challengeSent: data.challenge_sent
                            })
                        )

                        navigate("/verify-mfa")
                        return
                    }

                    await queryClient.invalidateQueries({ queryKey: ["user"] })

                    navigate("/profile")
                },

                onError: (error) => {

                    if (error.code === "VALIDATION_ERROR") {

                        const firstField = Object.values(error.errors ?? {})[0]

                        setError(firstField?.[0] ?? error.message)
                        return
                    }

                    setError(error.message)
                }
            }
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">

            <Card className="w-90">

                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {error && (
                            <p className="text-sm text-destructive">
                                {error}
                            </p>
                        )}

                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setError(null)
                            }}
                        />

                        <div className="space-y-1">

                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError(null)
                                }}
                            />

                            <div className="text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-muted-foreground hover:text-primary"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {loginMutation.isPending
                                ? "Logging in..."
                                : "Login"}
                        </Button>

                        <GoogleLoginButton />

                        <p className="text-sm text-center text-muted-foreground">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-primary hover:underline"
                            >
                                Register
                            </Link>
                        </p>

                    </form>

                </CardContent>

            </Card>

        </div>
    )
}