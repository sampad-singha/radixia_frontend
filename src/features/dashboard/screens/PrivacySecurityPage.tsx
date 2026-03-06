import { useState } from "react"
import { useTwoFactorMethods } from "@/features/authentication/queries/mfa.queries"

import EnableMfa from "@/features/authentication/components/mfa/EnableMfa"
import DisableMfa from "@/features/authentication/components/mfa/DisableMfa"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useRegenerateRecoveryCodes } from "@/features/authentication/queries/mfa.queries"

export default function PrivacySecurityPage() {

    const { data: methods, isLoading } = useTwoFactorMethods()
    const regenerateMutation = useRegenerateRecoveryCodes()

    const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null)

    if (isLoading) return null

    const confirmedMethods =
        methods?.filter((m) => m.confirmed_at !== null) ?? []

    const handleRegenerateCodes = () => {

        regenerateMutation.mutate(undefined, {
            onSuccess: (codes) => {
                setRecoveryCodes(codes)
            }
        })

    }

    const copyCodes = () => {
        if (!recoveryCodes) return
        navigator.clipboard.writeText(recoveryCodes.join("\n"))
    }

    const exportCodes = () => {
        if (!recoveryCodes) return

        const blob = new Blob([recoveryCodes.join("\n")], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "recovery-codes.txt"
        a.click()
    }

    return (

        <div className="space-y-8">

            <h1 className="text-2xl font-semibold">
                Privacy & Security
            </h1>

            <Card>

                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Enabled Methods */}

                    {confirmedMethods.length > 0 && (

                        <div className="space-y-4">

                            {confirmedMethods.map((method) => (

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
                                                onClick={handleRegenerateCodes}
                                                disabled={regenerateMutation.isPending}
                                            >
                                                Regenerate Codes
                                            </Button>
                                        )}

                                        <DisableMfa type={method.type} />

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                    {/* Show regenerated recovery codes */}

                    {recoveryCodes && (

                        <div className="border p-4 rounded-md space-y-4">

                            <p className="text-sm font-medium">
                                New Recovery Codes
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                                {recoveryCodes.map((code) => (
                                    <div key={code}>{code}</div>
                                ))}
                            </div>

                            <div className="flex gap-2">

                                <Button size="sm" onClick={copyCodes}>
                                    Copy
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={exportCodes}
                                >
                                    Export
                                </Button>

                            </div>

                        </div>

                    )}

                    {/* Enable new MFA method */}

                    <EnableMfa />

                </CardContent>

            </Card>

        </div>
    )
}