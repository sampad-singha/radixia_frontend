import { useState } from "react"
import {useSearchParams, useNavigate, Link} from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { api } from "@/lib/api.ts"
import { toast } from "sonner"
import {Loader2} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function ResetPasswordPage() {

    const [params] = useSearchParams()
    const navigate = useNavigate()

    const token = params.get("token")
    const email = params.get("email")

    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async () => {

        setLoading(true)

        try {

            await api.post("/v1/auth/reset-password", {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation
            })

            toast.success("Password reset successfully")

            navigate("/login")

        } catch {

            toast.error("Reset failed. Invalid token or password requirements not met.")

        }

        setLoading(false)
    }

    return (

        <div className="flex items-center justify-center min-h-screen p-4">

            <Card className="w-90">

                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>

                <CardContent>

                    <div className="space-y-4">

                        <Input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Confirm password"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />

                        <Button
                            className="w-full"
                            onClick={submit}
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>

                        <p className="text-sm text-center text-muted-foreground">
                            <Link
                                to="/login"
                                className="hover:text-primary"
                            >
                                Back to login
                            </Link>
                        </p>

                    </div>

                </CardContent>

            </Card>

        </div>

    )
}