import React, { useState } from "react"
import { useRegister } from "@/queries/auth.queries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {

    const registerMutation = useRegister()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        registerMutation.mutate({
            name: form.name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen">

            <form onSubmit={handleSubmit} className="space-y-4 w-80">

                <h1 className="text-xl font-semibold">Register</h1>

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
                    {registerMutation.isPending ? "Creating..." : "Register"}
                </Button>

            </form>

        </div>
    )
}