import { Button } from "@/components/ui/button"
import { useDisableMfa } from "@/features/authentication/queries/mfa.queries"
import { useQueryClient } from "@tanstack/react-query"

export default function DisableMfa() {

    const disableMutation = useDisableMfa()
    const queryClient = useQueryClient()

    const handleDisable = () => {

        disableMutation.mutate(undefined, {
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
            Disable MFA
        </Button>

    )
}