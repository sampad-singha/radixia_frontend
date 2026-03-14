import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx"

import { Loader2 } from "lucide-react"

import { sendMfaChallenge } from "@/services/auth/mfa.service.ts"

type AuthMethod = "password" | "email" | "totp"

export default function SudoModal({open, methods, onConfirm, onClose}: {
    open: boolean
    methods: AuthMethod[]
    onConfirm: (type: AuthMethod, value?: string) => Promise<void>
    onClose: () => void
}) {

    const [type, setType] = useState<AuthMethod | undefined>(methods[0])
    const [value, setValue] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (methods.length && !type) {
            setType(methods[0])
        }
    }, [methods])

    const sendChallenge = async () => {

        try {

            setSending(true)
            setError(null)

            await sendMfaChallenge("email")

        } catch (err: any) {

            setError(err.message)

        } finally {

            setSending(false)

        }

    }

    const handleConfirm = async () => {

        if (!type) return

        setError(null)
        setLoading(true)

        try {

            await onConfirm(type, value)

        } catch (err: any) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }

    return (

        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        Confirm your identity
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <Select
                        value={type ?? ""}
                        onValueChange={(v) => {
                            setType(v as AuthMethod)
                            setValue("")
                        }}
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

                    {type === "email" && (

                        <div className="flex gap-2">

                            <Input
                                className="flex-1"
                                placeholder="Enter verification code"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />

                            <Button
                                variant="outline"
                                onClick={sendChallenge}
                                disabled={sending}
                            >
                                {sending ? (
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                ) : (
                                    "Send"
                                )}
                            </Button>

                        </div>

                    )}

                    {type === "password" && (

                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />

                    )}

                    {type === "totp" && (

                        <Input
                            placeholder="Enter verification code"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />

                    )}

                    <Button
                        className="w-full"
                        onClick={handleConfirm}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Checking...
                            </>
                        ) : (
                            "Confirm"
                        )}

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    )
}