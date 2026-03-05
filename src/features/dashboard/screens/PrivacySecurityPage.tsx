import { useUser } from "@/features/authentication/queries/auth.queries"

import EnableMfa from "@/features/authentication/components/mfa/EnableMfa"
import DisableMfa from "@/features/authentication/components/mfa/DisableMfa"
import RecoveryCodes from "@/features/authentication/components/mfa/RecoveryCodes"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacySecurityPage() {

    const { data: user, isLoading } = useUser()

    if (isLoading) return null

    const mfaEnabled = !!user.two_factor_confirmed_at

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

                    {!mfaEnabled && (
                        <EnableMfa />
                    )}

                    {mfaEnabled && (
                        <>
                            <RecoveryCodes />
                            <DisableMfa />
                        </>
                    )}

                </CardContent>

            </Card>

        </div>
    )
}