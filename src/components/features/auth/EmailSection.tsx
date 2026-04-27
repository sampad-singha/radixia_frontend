import { useState } from "react"
import { useAuth } from "@/context/AuthContext.tsx"
import { useQueryClient } from "@tanstack/react-query"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card.tsx"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { api } from "@/lib/api.ts"
import type { ApiError } from "@/lib/types/types.ts"

import {
    useRequestEmailChange,
    useVerifyEmailChange
} from "@/queries/auth/auth.queries.ts"
import {Skeleton} from "@/components/ui/skeleton.tsx";


export default function EmailSection() {

    const { user } = useAuth()
    const queryClient = useQueryClient()

    const requestMutation = useRequestEmailChange()
    const verifyMutation = useVerifyEmailChange()

    const [dialogOpen, setDialogOpen] = useState(false)
    const [step, setStep] = useState<"email" | "code">("email")

    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")


    const resendVerification = async () => {

        try {

            await api.post("/v1/auth/email/verification-notification")

            toast.success("Verification email sent")

        } catch {

            toast.error("Failed to send verification email")

        }

    }


    const requestChange = async (): Promise<void> => {

        try {

            await requestMutation.mutateAsync(email)

            toast.success("Verification code sent")

            setStep("code")

        } catch (error) {

            const err = error as ApiError

            toast.error(err.message || "Failed to request email change")

        }

    }


    const verifyCode = async (): Promise<void> => {

        try {

            await verifyMutation.mutateAsync(code)

            toast.success("Email updated successfully")

            await queryClient.invalidateQueries({
                queryKey: ["user"]
            })

            setDialogOpen(false)
            setStep("email")
            setEmail("")
            setCode("")

        } catch (error) {

            const err = error as ApiError

            toast.error(err.message || "Verification failed")

        }

    }

    const resetChangeFlow = () => {
        setStep("email")
        setEmail("")
        setCode("")
    }


    if (!user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-20" />
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-28" />
                    </div>

                </CardContent>
            </Card>
        )
    }


    return (
        <>
            <Card>

                <CardHeader>
                    <CardTitle>Email</CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">

                    <div className="space-y-1">

                        <div className="flex items-center gap-2">

                            <p className="text-sm font-medium">
                                {user.email}
                            </p>

                            <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                    user.email_verified_at
                                        ? "bg-green-500/10 text-green-600"
                                        : "bg-destructive/10 text-destructive"
                                }`}
                            >
                                {user.email_verified_at ? "Verified" : "Unverified"}
                            </span>

                        </div>

                    </div>

                    <div className="flex gap-2">

                        {!user.email_verified_at && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={resendVerification}
                            >
                                Resend verification
                            </Button>
                        )}

                        <Button
                            size="sm"
                            onClick={() => setDialogOpen(true)}
                        >
                            Change Email
                        </Button>

                    </div>

                </CardContent>

            </Card>


            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>

                <DialogContent className="sm:max-w-sm">

                    <DialogHeader>

                        <DialogTitle>
                            {step === "email"
                                ? "Change Email"
                                : "Verify Email"}
                        </DialogTitle>

                    </DialogHeader>


                    <div className="space-y-4">

                        {step === "email" && (
                            <>
                                <Input
                                    type="email"
                                    placeholder="Enter new email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                                <Button
                                    className="w-full"
                                    onClick={requestChange}
                                    disabled={requestMutation.isPending}
                                >

                                    {requestMutation.isPending && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}

                                    {requestMutation.isPending
                                        ? "Sending verification code..."
                                        : "Send Verification Code"}

                                </Button>
                            </>
                        )}


                        {step === "code" && (
                            <>
                                <Input
                                    placeholder="Enter verification code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    autoFocus
                                />

                                <div className="flex gap-2 justify-between">

                                    <Button
                                        variant="outline"
                                        className="w-1/2"
                                        onClick={() => {
                                            resetChangeFlow()
                                            setDialogOpen(false)
                                        }}>
                                        Cancel
                                    </Button>

                                    <Button
                                        className="w-1/2"
                                        onClick={verifyCode}
                                        disabled={verifyMutation.isPending}
                                    >

                                        {verifyMutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}

                                        {verifyMutation.isPending
                                            ? "Verifying..."
                                            : "Verify Email"}

                                    </Button>

                                </div>
                            </>
                        )}

                    </div>

                </DialogContent>

            </Dialog>
        </>
    )
}