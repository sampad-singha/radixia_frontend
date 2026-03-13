import { Button } from "@/components/ui/button"
import { useDisableMfa } from "@/features/authentication/queries/mfa.queries"
import { useQueryClient } from "@tanstack/react-query"
import type { MfaType } from "@/lib/types"

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