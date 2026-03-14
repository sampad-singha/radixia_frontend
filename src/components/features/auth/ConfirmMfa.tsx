import {useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {useConfirmMfa} from "@/queries/auth/mfa.queries.ts"
import {useQueryClient} from "@tanstack/react-query"
import type {MfaType} from "@/lib/types/types.ts";

export default function ConfirmMfa({type, onConfirmed}: {
    type: MfaType
    onConfirmed?: () => void
}) {

    const confirmMutation = useConfirmMfa()
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)
    const [code, setCode] = useState("")

    const handleConfirm = () => {

        confirmMutation.mutate(
            { type, code },
            {
                onSuccess: () => {

                    queryClient.invalidateQueries({
                        queryKey: ["mfa-methods"]
                    })

                    onConfirmed?.()

                },

                onError: (err: any) => {
                    setError(err.message)
                }
            }
        )

    }

    return (

        <div className="space-y-3">

            <Input
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}

            <Button
                onClick={handleConfirm}
                disabled={confirmMutation.isPending}
            >
                Confirm MFA
            </Button>

        </div>

    )
}