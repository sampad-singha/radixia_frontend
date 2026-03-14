import { useState } from "react"
import {
    useTwoFactorMethods,
    useRegenerateRecoveryCodes,
    useRecoveryCodes
} from "@/queries/auth/mfa.queries.ts"

import EnableMfa from "@/components/features/auth/EnableMfa.tsx"
import EnabledMfaList from "./EnabledMfaList.tsx"
import RecoveryCodesCard from "./RecoveryCodesCard.tsx"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import type { MfaType } from "@/lib/types/types.ts"
import {Skeleton} from "@/components/ui/skeleton.tsx";

type TwoFactorMethod = {
    type: MfaType
    confirmed_at: string | null
    is_default: boolean
}

export default function TwoFactorSection() {

    const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null)
    const [showCodes, setShowCodes] = useState(false)
    const codesMutation = useRecoveryCodes()

    const handleToggleCodes = () => {

        if (showCodes) {
            setShowCodes(false)
            return
        }

        if (!recoveryCodes) {
            codesMutation.mutate(undefined, {
                onSuccess: (codes) => {
                    setRecoveryCodes(codes)
                    setShowCodes(true)
                }
            })
        } else {
            setShowCodes(true)
        }

    }

    const { data: methods, isLoading } =
        useTwoFactorMethods() as {
            data: TwoFactorMethod[]
            isLoading: boolean
        }

    const regenerateMutation = useRegenerateRecoveryCodes()

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Enabled MFA methods */}
                    <div className="space-y-4">
                        {[1,2].map((i) => (
                            <div
                                key={i}
                                className="border p-4 rounded-md flex items-center justify-between"
                            >
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-3 w-28" />
                                </div>

                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-32" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enable MFA section */}
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-36" />
                    </div>

                </CardContent>
            </Card>
        )
    }

    const confirmedMethods =
        methods?.filter((m) => m.confirmed_at !== null) ?? []

    const enabledTypes = confirmedMethods.map((m) => m.type)

    const handleRegenerateCodes = () => {

        regenerateMutation.mutate(undefined, {
            onSuccess: (codes) => {
                setRecoveryCodes(codes)
            }
        })

    }

    return (

        <Card>

            <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                <EnabledMfaList
                    methods={confirmedMethods}
                    onToggleCodes={handleToggleCodes}
                    showCodes={showCodes}
                />

                {showCodes && recoveryCodes && (
                    <RecoveryCodesCard
                        codes={recoveryCodes}
                        onRegenerate={handleRegenerateCodes}
                        loading={regenerateMutation.isPending}
                    />
                )}

                <EnableMfa disabledTypes={enabledTypes} />

            </CardContent>

        </Card>

    )

}