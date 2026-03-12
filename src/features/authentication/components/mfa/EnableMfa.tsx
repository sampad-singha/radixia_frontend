import {useState} from "react"
import {Button} from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {useEnableMfa} from "@/features/authentication/queries/mfa.queries"
import ConfirmMfa from "./ConfirmMfa"
import RecoveryCodes from "./RecoveryCodes"
import type {MfaType} from "@/lib/types"
import {Skeleton} from "@/components/ui/skeleton"

function EmailSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full"/>
            <Skeleton className="h-10 w-40"/>
        </div>
    )
}

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
    const [qrLoaded, setQrLoaded] = useState(false)

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

    function TotpSkeleton() {
        return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32"/>
                    <Skeleton className="h-[200px] w-[200px]"/>
                </div>

                <Skeleton className="h-4 w-64"/>

                <Skeleton className="h-10 w-full"/>

                <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-6 w-full"/>
                    ))}
                </div>
            </div>
        )
    }

    if (availableMethods.length === 0) return null

    return (
        <Card>

            <CardHeader>
                <CardTitle>Enable Two-Factor Authentication</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                {enableMutation.isPending && (
                    selectedType === "totp"
                        ? <TotpSkeleton/>
                        : <EmailSkeleton/>
                )}

                {!enableMutation.isPending && setupData && (
                    <div className="space-y-6">

                        {setupData.qr_code_url && (
                            <div className="space-y-2">

                                <p className="text-sm font-medium">
                                    Scan QR Code
                                </p>

                                <div className="relative w-[200px] h-[200px]">

                                    {!qrLoaded && (
                                        <Skeleton className="absolute inset-0 h-[200px] w-[200px]"/>
                                    )}

                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.qr_code_url)}`}
                                        alt="QR Code"
                                        className={`w-[200px] h-[200px] ${qrLoaded ? "opacity-100" : "opacity-0"}`}
                                        onLoad={() => setQrLoaded(true)}
                                    />

                                </div>

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
                            <RecoveryCodes codes={setupData.recovery_codes}/>
                        )}

                    </div>
                )}

                {!enableMutation.isPending && !setupData && (
                    <>

                        <Select
                            value={selectedType}
                            onValueChange={(value) =>
                                setType(value as MfaType)
                            }
                            disabled={availableMethods.length === 1}
                        >

                            <SelectTrigger>
                                <SelectValue placeholder="Select MFA Method"/>
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

                    </>
                )}

            </CardContent>

        </Card>
    )
}