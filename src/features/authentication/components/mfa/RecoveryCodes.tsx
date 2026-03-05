export default function RecoveryCodes({
                                          codes = []
                                      }: {
    codes?: string[]
}) {

    if (!codes.length) return null

    return (

        <div className="space-y-2">

            <p className="text-sm font-medium">
                Recovery Codes
            </p>

            <div className="grid grid-cols-2 gap-2 text-sm font-mono">

                {codes.map((code) => (
                    <div key={code}>{code}</div>
                ))}

            </div>

        </div>

    )
}