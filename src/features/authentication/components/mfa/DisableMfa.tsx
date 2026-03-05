import { Button } from "@/components/ui/button"
import { useDisableMfa } from "@/features/authentication/queries/mfa.queries"

export default function DisableMfa() {

    const disableMutation = useDisableMfa()

    return (

        <Button
            variant="destructive"
            onClick={() => disableMutation.mutate()}
            disabled={disableMutation.isPending}
        >
            Disable MFA
        </Button>

    )
}