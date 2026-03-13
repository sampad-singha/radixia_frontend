import { api } from "@/lib/api"
import type {LoginResponse} from "@/lib/types.ts";

export const exchangeOAuthCode = async (
    provider: string,
    code: string
): Promise<LoginResponse> => {

    try {

        const res = await api.post(
            `/v1/auth/social/${provider}/callback`,
            {
                code,
                device_name: "web"
            }
        )

        const payload: LoginResponse = res.data.data

        localStorage.setItem("token", payload.token)

        return payload

    } catch (error: any) {

        if (error.status === 423) {

            const payload: LoginResponse = error.data

            localStorage.setItem("token", payload.token)

            return payload
        }

        throw error
    }
}