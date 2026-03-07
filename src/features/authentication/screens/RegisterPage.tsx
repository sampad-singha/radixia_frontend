import React, { useState } from "react"
import { useRegister } from "@/features/authentication/queries/auth.queries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import type { ApiError } from "@/lib/types"
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

export default function RegisterPage() {

    const registerMutation = useRegister()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const queryClient = useQueryClient()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(null)

        registerMutation.mutate(
            {
                name: form.name,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation
            },
            {
                onSuccess: async () => {

                    await queryClient.invalidateQueries({
                        queryKey: ["user"]
                    })

                    navigate("/profile")
                },

                onError: (error: ApiError) => {

                    if (error.code === "VALIDATION_ERROR") {
                        const first = Object.values(error.errors ?? {})[0]
                        setError(first?.[0] ?? error.message)
                        return
                    }

                    setError(error.message)
                }
            }
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">

            <form onSubmit={handleSubmit} className="space-y-4 w-80">

                <h1 className="text-xl font-semibold">Register</h1>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <Input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={form.password_confirmation}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password_confirmation: e.target.value
                        })
                    }
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {registerMutation.isPending ? "Creating..." : "Register"}
                </Button>

            </form>

        </div>
    )
}