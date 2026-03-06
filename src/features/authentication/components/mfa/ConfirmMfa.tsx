import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useConfirmMfa } from "@/features/authentication/queries/mfa.queries"
import { useQueryClient } from "@tanstack/react-query"

export default function ConfirmMfa({ type }: { type: string }) {

    const confirmMutation = useConfirmMfa()
    const queryClient = useQueryClient()

    const [code, setCode] = useState("")

    const handleConfirm = () => {

        confirmMutation.mutate(
            { type, code },
            {
                onSuccess: () => {

                    queryClient.invalidateQueries({
                        queryKey: ["mfa-methods"]
                    })

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

            <Button
                onClick={handleConfirm}
                disabled={confirmMutation.isPending}
            >
                Confirm MFA
            </Button>

        </div>

    )
}