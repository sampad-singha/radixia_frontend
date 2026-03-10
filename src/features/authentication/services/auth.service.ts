import { api } from "@/lib/api.ts"
import type {LoginResponse, Session} from "@/lib/types.ts";

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {

    try {

        const res = await api.post("/v1/auth/login", {
            email,
            password,
            device_name: "web"
        })

        const payload: LoginResponse = res.data.data

        localStorage.setItem("token", payload.token)

        return payload

    } catch (error: any) {

        if (error.status === 423) {

            const payload: LoginResponse = error.data.data

            localStorage.setItem("token", payload.token)

            return payload
        }

        throw error
    }
}

export const verifyLogin = async (
    type: string,
    code: string
) => {

    const res = await api.post("/v1/auth/verify-login", {
        type,
        code,
        device_name: "web"
    })

    const payload = res.data.data

    localStorage.setItem("token", payload.token)

    return payload.user
}

export const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
) => {
    const res = await api.post("/v1/auth/register", {
        name,
        email,
        password,
        password_confirmation,
        device_name: "web"
    })

    const token = res.data.data.token
    localStorage.setItem("token", token)

    return res.data
}

export const getMe = async () => {
    const res = await api.get("/v1/auth/me")
    return res.data.data.user
}

export const logout = async () => {
    await api.post("/v1/auth/logout")
    localStorage.removeItem("token")
}

export const updatePassword = async (
    current_password: string,
    password: string,
    password_confirmation: string
) => {

    const res = await api.post("/v1/auth/change-password", {
        current_password,
        password,
        password_confirmation
    })

    return res.data
}

export const setPassword = async (
    password: string,
    password_confirmation: string
) => {

    await api.post("/v1/auth/set-password", {
        password,
        password_confirmation
    })
}

export const getSessions = async (): Promise<Session[]> => {
    const res = await api.get("/v1/auth/sessions")
    return res.data.data
}

export const revokeSession = async (sessionId: number) => {
    const res = await api.delete(`/v1/auth/sessions/${sessionId}`)
    return res.data
}

export const revokeOtherSessions = async () => {
    const res = await api.delete("/v1/auth/sessions")
    return res.data
}

export const requestEmailChange = async (email: string) => {

    const res = await api.post("/v1/user/email", {
        email
    })

    return res.data
}

export const verifyEmailChange = async (code: string) => {

    const res = await api.post("/v1/user/email/verify", {
        code
    })

    return res.data
}