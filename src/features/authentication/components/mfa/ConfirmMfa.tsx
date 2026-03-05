import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useConfirmMfa } from "@/features/authentication/queries/mfa.queries"

export default function ConfirmMfa({ type }: { type: string }) {

    const confirmMutation = useConfirmMfa()

    const [code, setCode] = useState("")
    const [success, setSuccess] = useState(false)

    const handleConfirm = () => {

        confirmMutation.mutate(
            { type, code },
            {
                onSuccess: () => {
                    setSuccess(true)
                }
            }
        )

    }

    if (success) {
        return (
            <p className="text-green-600 text-sm">
                MFA successfully enabled
            </p>
        )
    }

    return (

        <div className="space-y-3">

            <Input
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <Button
                onClick={handleConfirm}
                disabled={confirmMutation.isPending}
            >
                Confirm MFA
            </Button>

        </div>

    )
}