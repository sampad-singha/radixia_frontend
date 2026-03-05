import { api } from "@/lib/api.ts"

export const sendMfaChallenge = async (type: string) => {

    const res = await api.post("/v1/auth/challenge", {
        type
    })

    return res.data.data
}