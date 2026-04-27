import DisableMfa from "@/components/features/auth/DisableMfa.tsx"
import { Button } from "@/components/ui/button.tsx"
import type { MfaType } from "@/lib/types/types.ts"

type Method = {
    type: MfaType
    confirmed_at: string | null
    is_default: boolean
}

export default function EnabledMfaList({methods, onToggleCodes, showCodes}: {
    methods: Method[]
    onToggleCodes: () => void
    showCodes: boolean
}) {

    if (!methods.length) return null

    return (

        <div className="space-y-4">

            {methods.map((method) => (

                <div
                    key={method.type}
                    className="border p-4 rounded-md flex items-center justify-between"
                >

                    <div>

                        <p className="text-sm font-medium">
                            {method.type === "totp"
                                ? "Authenticator App"
                                : "Email Verification"}
                        </p>

                        {method.is_default && (
                            <p className="text-xs text-muted-foreground">
                                Default method
                            </p>
                        )}

                    </div>

                    <div className="flex gap-2">

                        {method.type === "totp" && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onToggleCodes}
                            >
                                {showCodes ? "Hide Recovery Codes" : "Show Recovery Codes"}
                            </Button>

                        )}

                        <DisableMfa type={method.type} />

                    </div>

                </div>

            ))}

        </div>

    )

}