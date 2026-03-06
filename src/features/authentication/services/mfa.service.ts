import { api } from "@/lib/api.ts"

export const getTwoFactorMethods = async () => {

    const res = await api.get("/v1/auth/two-factor")

    return res.data.data.methods
}

export const sendMfaChallenge = async (type: string) => {

    const res = await api.post("/v1/auth/challenge", {
        type
    })

    return res.data.data
}

export const enableMfa = async (type: "email" | "totp") => {

    const res = await api.post("/v1/auth/two-factor/enable", {
        type
    })

    return res.data.data
}


export const confirmMfa = async (
    type: string,
    code: string
) => {

    const res = await api.post("/v1/auth/two-factor/confirm", {
        type,
        code
    })

    return res.data
}


export const disableMfa = async () => {

    const res = await api.delete("/v1/auth/two-factor")

    return res.data
}

export const regenerateRecoveryCodes = async (): Promise<string[]> => {

    const res = await api.post("/v1/auth/two-factor/recovery-codes")

    return res.data.data.recovery_codes

}