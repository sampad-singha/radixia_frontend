import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { toast } from "sonner"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Loader2} from "lucide-react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async () => {

        setLoading(true)

        try {

            await api.post("/v1/auth/forgot-password", { email })

            toast(
                "If an account exists with that email, you will receive a password reset link shortly.",
                {
                    duration: 5000
                }
            )

        } catch {

            toast.error("Something went wrong")

        }

        setLoading(false)
    }

    return (

        <div className="flex items-center justify-center min-h-screen p-4">

            <Card className="w-90">

                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>

                <CardContent>

                    <div className="space-y-4">

                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            className="w-full"
                            onClick={submit}
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>

                        <p className="text-sm text-center text-muted-foreground">
                            <Link to="/login" className="hover:text-primary">
                                Back to login
                            </Link>
                        </p>

                    </div>

                </CardContent>

            </Card>

        </div>

    )
}