import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Loader2 } from "lucide-react"
import type { ApiError } from "@/lib/types/types.ts"
import {useSetPassword} from "@/queries/auth/auth.queries.ts";
import {toast} from "sonner";

export default function SetPasswordCard() {

    const queryClient = useQueryClient()
    const mutation = useSetPassword()

    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [error, setError] = useState<string | null>(null)

    const submit = () => {

        setError(null)

        mutation.mutate(
            {
                password,
                password_confirmation: passwordConfirmation
            },
            {
                onSuccess: async () => {

                    await queryClient.invalidateQueries({
                        queryKey: ["user"]
                    })

                    setPassword("")
                    setPasswordConfirmation("")

                    toast.success("Password set successfully", {
                        className: "text-green-600"
                    })
                },

                onError: (error: ApiError) => {

                    if (error.code === "VALIDATION_ERROR") {

                        const firstField =
                            Object.values(error.errors ?? {})[0]

                        setError(firstField?.[0] ?? error.message)
                        return
                    }

                    setError(error.message)
                }
            }
        )
    }

    return (
        <Card>

            <CardHeader>
                <CardTitle>Set Password</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <p className="text-sm text-muted-foreground">
                    You signed in using a social provider. Set a password
                    if you want to log in using email and password.
                </p>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError(null)
                    }}
                />

                <Input
                    type="password"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(e) => {
                        setPasswordConfirmation(e.target.value)
                        setError(null)
                    }}
                />

                <Button onClick={submit} disabled={mutation.isPending}>

                    {mutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {mutation.isPending ? "Setting..." : "Set Password"}

                </Button>

            </CardContent>

        </Card>
    )
}