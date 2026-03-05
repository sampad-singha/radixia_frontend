import axios from "axios"
import type {ApiError} from "@/lib/types.ts";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,

    (error) => {

        const status = error.response?.status
        const data = error.response?.data

        const normalized: ApiError & {
            status?: number
            data?: unknown
        } = {
            message: data?.message ?? "Something went wrong",
            code: data?.code ?? "UNKNOWN_ERROR",
            errors: data?.errors ?? {},
            status,
            data
        }

        return Promise.reject(normalized)
    }
)