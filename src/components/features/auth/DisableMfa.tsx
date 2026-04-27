import { Button } from "@/components/ui/button.tsx"
import { useDisableMfa } from "@/queries/auth/mfa.queries.ts"
import { useQueryClient } from "@tanstack/react-query"
import type { MfaType } from "@/lib/types/types.ts"

export default function DisableMfa({ type }: { type: MfaType }) {

    const disableMutation = useDisableMfa()
    const queryClient = useQueryClient()

    const handleDisable = () => {

        disableMutation.mutate(type, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["mfa-methods"]
                })
            }
        })

    }

    return (
        <Button
            variant="destructive"
            onClick={handleDisable}
            disabled={disableMutation.isPending}
        >
            Disable
        </Button>
    )
}