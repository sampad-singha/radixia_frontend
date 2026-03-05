import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyLogin } from "@/services/auth.service"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {useQueryClient} from "@tanstack/react-query";

export default function VerifyMfaPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const methods =
        JSON.parse(sessionStorage.getItem("mfa_methods") || "[]")

    const [type, setType] = useState(methods[0] || "")
    const [code, setCode] = useState("")

    const handleVerify = async () => {
        try {

            await verifyLogin(type, code)

            sessionStorage.removeItem("mfa_methods")

            // refresh user state
            await queryClient.invalidateQueries({ queryKey: ["user"] })

            navigate("/profile")

        } catch {
            alert("Invalid verification code")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Multi-Factor Verification</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Verification Method</Label>

                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>

                            <SelectContent>
                                {methods.map((m: string) => (
                                    <SelectItem key={m} value={m}>
                                        {m.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Verification Code</Label>

                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter code"
                        />
                    </div>

                    <Button className="w-full" onClick={handleVerify}>
                        Verify
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}