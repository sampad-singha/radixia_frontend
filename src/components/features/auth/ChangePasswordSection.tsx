import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useUpdatePassword } from "@/queries/auth/auth.queries.ts"
import type {ApiError} from "@/lib/types/types.ts";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function ChangePasswordSection() {

    const mutation = useUpdatePassword()

    const [form, setForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: ""
    })

    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = () => {

        setError(null)

        mutation.mutate(form, {
            onSuccess: () => {
                setForm({
                    current_password: "",
                    password: "",
                    password_confirmation: ""
                })
                toast.success("Password updated successfully", {
                    className: "text-green-600"
                })

                navigate("/login")
            },
            onError: (error: ApiError) => {

                const first = Object.values(error.errors ?? {})[0]

                setError(first?.[0] ?? error.message)

            }
        })
    }

    return (

        <Card>

            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                <Input
                    type="password"
                    placeholder="Current password"
                    value={form.current_password}
                    onChange={(e) =>
                        setForm({ ...form, current_password: e.target.value })
                    }
                />

                <Input
                    type="password"
                    placeholder="New password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={form.password_confirmation}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password_confirmation: e.target.value
                        })
                    }
                />

                <Button onClick={handleSubmit} disabled={mutation.isPending}>
                    {mutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {mutation.isPending ? "Updating..." : "Update Password"}
                </Button>

            </CardContent>

        </Card>

    )
}