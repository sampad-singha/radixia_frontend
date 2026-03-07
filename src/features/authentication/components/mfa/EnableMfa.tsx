import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEnableMfa } from "@/features/authentication/queries/mfa.queries"

import ConfirmMfa from "./ConfirmMfa"
import RecoveryCodes from "./RecoveryCodes"
import type { MfaType } from "@/lib/types"

export default function EnableMfa({
                                      disabledTypes = []
                                  }: {
    disabledTypes?: MfaType[]
}) {

    const enableMutation = useEnableMfa()

    const allMethods: MfaType[] = ["totp", "email"]

    const availableMethods = allMethods.filter(
        (method) => !disabledTypes.includes(method)
    )

    const [type, setType] = useState<MfaType>(
        availableMethods[0] ?? "totp"
    )

    const [setupData, setSetupData] = useState<any>(null)

    const selectedType = availableMethods.includes(type)
        ? type
        : availableMethods[0]

    const handleEnable = () => {

        if (!selectedType) return

        enableMutation.mutate(selectedType, {
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
                            alt="QR Code"
                        />
                    </div>
                )}

                {setupData.secret && (
                    <p className="text-sm">
                        Secret: <span className="font-mono">{setupData.secret}</span>
                    </p>
                )}

                <ConfirmMfa
                    type={selectedType}
                    onConfirmed={() => {
                        setSetupData(null)
                    }}
                />

                {setupData.recovery_codes && (
                    <RecoveryCodes codes={setupData.recovery_codes} />
                )}

            </div>
        )
    }

    if (availableMethods.length === 0) return null

    return (

        <Card>

            <CardHeader>
                <CardTitle>Enable Two-Factor Authentication</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                <Select
                    value={selectedType}
                    onValueChange={(value) =>
                        setType(value as MfaType)
                    }
                    disabled={availableMethods.length === 1}
                >

                    <SelectTrigger>
                        <SelectValue placeholder="Select MFA Method" />
                    </SelectTrigger>

                    <SelectContent>

                        {availableMethods.includes("totp") && (
                            <SelectItem value="totp">
                                Authenticator App
                            </SelectItem>
                        )}

                        {availableMethods.includes("email") && (
                            <SelectItem value="email">
                                Email Code
                            </SelectItem>
                        )}

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