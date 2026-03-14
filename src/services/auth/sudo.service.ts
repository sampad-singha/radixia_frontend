import { api } from "@/lib/api.ts"

export const getSudoUser = async () => {

    const res = await api.get("/v1/auth/get-sudo-user")

    return res.data
}

export const confirmSudo = async ({type, value}: {
    type: "password" | "email" | "totp"
    value?: string
}) => {

    const res = await api.post("/v1/auth/confirm-sudo", {
        type,
        value
    })

    return res.data
}