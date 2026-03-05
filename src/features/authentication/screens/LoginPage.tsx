import React, { useState } from "react"
import { useLogin } from "@/features/authentication/queries/auth.queries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {Loader2} from "lucide-react";

export default function LoginPage() {
    const loginMutation = useLogin()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        loginMutation.mutate(
            { email, password },
            {
                onSuccess: async (data) => {

                    if (data.mfa_required) {

                        sessionStorage.setItem(
                            "mfa_methods",
                            JSON.stringify(data.available_methods)
                        )

                        navigate("/verify-mfa")
                        return
                    }

                    // refresh user state
                    await queryClient.invalidateQueries({ queryKey: ["user"] })

                    navigate("/profile")
                }
            }
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-4 w-80">

                <h1 className="text-xl font-semibold">Login</h1>

                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>

            </form>
        </div>
    )
}