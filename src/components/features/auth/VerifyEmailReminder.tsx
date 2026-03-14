import { useVerifyEmail } from "@/context/VerifyEmailContext.tsx"
import { Button } from "@/components/ui/button.tsx"
import { api } from "@/lib/api.ts"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function VerifyEmailReminder() {

    const { show, close } = useVerifyEmail()

    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    useEffect(() => {

        if (!sent) return

        const timer = setTimeout(() => {
            close()
        }, 4000)

        return () => clearTimeout(timer)

    }, [sent, close])

    useEffect(() => {

        if (show) {
            setSent(false)
        }

    }, [show])

    if (!show) return null

    const resend = async () => {

        try {

            setSending(true)

            await api.post("/v1/auth/email/verification-notification")

            setSent(true)

        } catch {

            alert("Failed to send verification email")

        } finally {

            setSending(false)

        }
    }

    return (

        <div className="fixed bottom-6 right-6 w-[360px] rounded-lg border bg-background shadow-lg p-4 space-y-3">

            <div className="space-y-1">

                <p className="text-sm font-semibold">
                    Email verification required
                </p>

                <p className="text-sm text-muted-foreground">
                    Please verify your email address to access this feature.
                </p>

            </div>

            <div className="flex gap-2">

                <Button
                    size="sm"
                    onClick={resend}
                    disabled={sending || sent}
                >

                    {sending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    )}

                    {sent ? "Sent" : "Resend Email"}

                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={close}
                >
                    Dismiss
                </Button>

            </div>

        </div>
    )
}