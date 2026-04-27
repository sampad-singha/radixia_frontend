import { useMutation } from "@tanstack/react-query"
import { exchangeOAuthCode } from "../../services/auth/oauth.service.ts"

export const useOAuthLogin = () =>
    useMutation({
        mutationFn: ({provider, code}: {
            provider: string
            code: string
        }) => exchangeOAuthCode(provider, code)
    })