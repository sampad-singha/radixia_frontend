import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { verifyLogin } from "@/features/authentication/services/auth.service.ts"
import { sendMfaChallenge } from "@/features/authentication/services/mfa.service.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import {Loader2} from "lucide-react";

export default function VerifyMfaPage() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const methods =
        JSON.parse(sessionStorage.getItem("mfa_methods") || "[]")

    const [type,setType] = useState(methods[0] || "")
    const [code,setCode] = useState("")
    const [loading,setLoading] = useState(false)
    const [challengeLoading,setChallengeLoading] = useState(false)

    // prevent direct navigation to page
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!methods.length && !token) {
            navigate("/login")
        }
    }, [methods, token, navigate])

    const handleVerify = async () => {

        try {

            setLoading(true)

            await verifyLogin(type, code)

            sessionStorage.removeItem("mfa_methods")

            await queryClient.invalidateQueries({ queryKey: ["user"] })

            navigate("/profile")

        } catch {

            alert("Invalid verification code")

        } finally {

            setLoading(false)

        }
    }

    const handleMethodChange = async (value: string) => {

        setType(value)

        try {

            setChallengeLoading(true)

            await sendMfaChallenge(value)

        } catch {

            alert("Failed to send verification code")

        } finally {

            setChallengeLoading(false)

        }
    }

    const resendCode = async () => {

        try {

            setChallengeLoading(true)

            await sendMfaChallenge(type)

        } catch {

            alert("Failed to resend verification code")

        } finally {

            setChallengeLoading(false)

        }
    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-muted/40">

            <Card className="w-[400px]">

                <CardHeader>
                    <CardTitle>Multi-Factor Verification</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <div className="space-y-2">

                        <Label>Verification Method</Label>

                        <Select value={type} onValueChange={handleMethodChange}>

                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>

                            <SelectContent>
                                {methods.map((m:string)=>(
                                    <SelectItem key={m} value={m}>
                                        {m.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>

                    </div>

                    {type === "email" && (
                        <p className="text-sm text-muted-foreground">
                            Enter the verification code sent to your email.
                        </p>
                    )}

                    {type === "totp" && (
                        <p className="text-sm text-muted-foreground">
                            Enter the code from your authenticator app.
                        </p>
                    )}

                    <div className="space-y-2">

                        <Label>Verification Code</Label>

                        <Input
                            value={code}
                            onChange={(e)=>setCode(e.target.value)}
                            placeholder="Enter verification code"
                        />

                    </div>

                    <Button
                        className="w-full"
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Verifying..." : "Verify"}
                    </Button>

                    {type === "email" && (
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={resendCode}
                            disabled={challengeLoading}
                        >
                            {challengeLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {challengeLoading ? "Sending..." : "Resend Code"}
                        </Button>
                    )}

                </CardContent>

            </Card>

        </div>
    )
}