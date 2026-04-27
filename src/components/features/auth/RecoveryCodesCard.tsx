import { Button } from "@/components/ui/button.tsx"

export default function RecoveryCodesCard({codes, onRegenerate, loading}: {
    codes: string[] | null
    onRegenerate: () => void
    loading?: boolean
}) {

    if (!codes) return null

    const copyCodes = () => {
        navigator.clipboard.writeText(codes.join("\n"))
    }

    const exportCodes = () => {

        const blob = new Blob([codes.join("\n")], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "recovery-codes.txt"
        a.click()
    }

    return (

        <div className="border p-4 rounded-md space-y-4">

            <p className="text-sm font-medium">
                Recovery Codes
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                {codes.map((code) => (
                    <div key={code}>{code}</div>
                ))}
            </div>

            <div className="flex gap-2">

                <Button size="sm" onClick={copyCodes}>
                    Copy
                </Button>

                <Button size="sm" variant="outline" onClick={exportCodes}>
                    Export
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onRegenerate}
                    disabled={loading}
                >
                    Regenerate
                </Button>

            </div>

        </div>

    )

}