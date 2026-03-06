import { Button } from "@/components/ui/button"

export default function RecoveryCodes({
                                          codes = []
                                      }: {
    codes?: string[]
}) {

    if (!codes.length) return null

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

        <div className="space-y-3">

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

            </div>

        </div>

    )
}