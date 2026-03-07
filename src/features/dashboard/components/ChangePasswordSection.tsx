import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUpdatePassword } from "@/features/authentication/queries/auth.queries"
import type {ApiError} from "@/lib/types.ts";

export default function ChangePasswordSection() {

    const mutation = useUpdatePassword()

    const [form, setForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: ""
    })

    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = () => {

        setError(null)
        setMessage(null)

        mutation.mutate(form, {
            onSuccess: () => {
                setMessage("Password updated successfully")
                setForm({
                    current_password: "",
                    password: "",
                    password_confirmation: ""
                })
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

                {message && (
                    <p className="text-sm text-green-600">{message}</p>
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

                <Button
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                >
                    Update Password
                </Button>

            </CardContent>

        </Card>

    )
}