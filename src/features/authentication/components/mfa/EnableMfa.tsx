import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEnableMfa } from "@/features/authentication/queries/mfa.queries"

import ConfirmMfa from "./ConfirmMfa"
import RecoveryCodes from "./RecoveryCodes"

export default function EnableMfa() {

    const enableMutation = useEnableMfa()

    const [type, setType] = useState<"email" | "totp">("totp")
    const [setupData, setSetupData] = useState<any>(null)

    const handleEnable = () => {

        enableMutation.mutate(type, {
            onSuccess: (data) => {
                setSetupData(data)
            }
        })

    }

    if (setupData) {

        return (
            <div className="space-y-6">

                {setupData.qr_code_url && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Scan QR Code</p>
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.qr_code_url)}`}
                         alt="QR Code"/>
                    </div>
                )}

                {setupData.secret && (
                    <p className="text-sm">
                        Secret: <span className="font-mono">{setupData.secret}</span>
                    </p>
                )}

                <ConfirmMfa type={type} />

                {setupData.recovery_codes && (
                    <RecoveryCodes codes={setupData.recovery_codes} />
                )}

            </div>
        )
    }

    return (

        <Card>

            <CardHeader>
                <CardTitle>Enable Two-Factor Authentication</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <Select value={type} onValueChange={(value) => setType(value as "email" | "totp")}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select MFA Method" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="totp">Authenticator App</SelectItem>
                        <SelectItem value="email">Email Code</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    onClick={handleEnable}
                    disabled={enableMutation.isPending}
                >
                    Enable MFA
                </Button>

            </CardContent>

        </Card>
    )
}