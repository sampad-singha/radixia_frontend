import { api } from "@/lib/api"

export const login = async (email: string, password: string) => {
    const res = await api.post("/v1/auth/login", {
        email,
        password,
        device_name: "web"
    })

    const token = res.data.data.token
    localStorage.setItem("token", token)

    return res.data
}

export const register = async (data: any) => {
    const res = await api.post("/v1/auth/register", data)
    return res.data
}

export const getMe = async () => {
    const res = await api.get("/v1/auth/me")
    return res.data
}

export const logout = async () => {
    await api.post("/v1/auth/logout")
    localStorage.removeItem("token")
}