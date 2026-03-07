import axios from "axios"
import type {ApiError} from "@/lib/types.ts";
import { sudoBus } from "./sudoBus"

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

        if (normalized.code === "SUDO_REQUIRED") {

            const methods =
                (normalized.data as { available_methods?: ("password" | "email" | "totp")[] })
                    ?.available_methods ?? ["password"]

            return new Promise((_, reject) => {

                sudoBus.trigger(error.config, methods, reject)

            })
        }

        return Promise.reject(normalized)
    }
)