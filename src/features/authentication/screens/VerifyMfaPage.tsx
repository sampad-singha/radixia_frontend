import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import {
    useVerifyLogin,
    useSendMfaChallenge
} from "@/features/authentication/queries/mfa.queries"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import { Loader2 } from "lucide-react"
import type { ApiError } from "@/lib/types"

export default function VerifyMfaPage() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const verifyMutation = useVerifyLogin()
    const challengeMutation = useSendMfaChallenge()

    const mfa = JSON.parse(
        sessionStorage.getItem("mfa_data") || "{}"
    )

    const methods: string[] = mfa.methods ?? []
    const defaultMethod: string | null = mfa.defaultMethod ?? null
    const initialChallengeSent: boolean = mfa.challengeSent ?? false

    const [type, setType] = useState<string>(defaultMethod || "")
    const [code, setCode] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [challengeSent, setChallengeSent] = useState(initialChallengeSent)

    const token = localStorage.getItem("token")

    useEffect(() => {

        if (!methods.length && !token) {
            navigate("/login")
        }

    }, [methods, token, navigate])

    useEffect(() => {

        if (!challengeSent && defaultMethod) {

            challengeMutation.mutate(defaultMethod, {
                onSuccess: () => {
                    setChallengeSent(true)
                }
            })

        }

    }, [])

    const handleVerify = () => {

        setError(null)

        verifyMutation.mutate(
            { type, code },
            {
                onSuccess: async () => {

                    sessionStorage.removeItem("mfa_data")

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

    const handleMethodChange = (value: string) => {

        setType(value)
        setError(null)
        setChallengeSent(false)

        challengeMutation.mutate(value, {
            onSuccess: () => {
                setChallengeSent(true)
            },
            onError: (error: ApiError) => {
                setError(error.message)
            }
        })
    }

    const resendCode = () => {

        setError(null)

        challengeMutation.mutate(type, {
            onError: (error: ApiError) => {
                setError(error.message)
            }
        })
    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-muted/40">

            <Card className="w-[400px]">

                <CardHeader>
                    <CardTitle>Multi-Factor Verification</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <div className="space-y-2">

                        <Label>Verification Method</Label>

                        <Select
                            value={type}
                            onValueChange={handleMethodChange}
                        >

                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>

                            <SelectContent>

                                {methods.map((m) => (

                                    <SelectItem key={m} value={m}>
                                        {m.toUpperCase()}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    {challengeSent && type === "email" && (
                        <p className="text-sm text-muted-foreground">
                            Enter the verification code sent to your email.
                        </p>
                    )}

                    {challengeSent && type === "totp" && (
                        <p className="text-sm text-muted-foreground">
                            Enter the code from your authenticator app.
                        </p>
                    )}

                    {challengeSent && (

                        <div className="space-y-2">

                            <Label>Verification Code</Label>

                            <Input
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value)
                                    setError(null)
                                }}
                                placeholder="Enter verification code"
                            />

                        </div>

                    )}

                    {challengeSent && (

                        <Button
                            className="w-full"
                            onClick={handleVerify}
                            disabled={verifyMutation.isPending}
                        >

                            {verifyMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {verifyMutation.isPending
                                ? "Verifying..."
                                : "Verify"
                            }

                        </Button>

                    )}

                    {challengeSent && type === "email" && (

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={resendCode}
                            disabled={challengeMutation.isPending}
                        >

                            {challengeMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {challengeMutation.isPending
                                ? "Sending..."
                                : "Resend Code"
                            }

                        </Button>

                    )}

                </CardContent>

            </Card>

        </div>
    )
}