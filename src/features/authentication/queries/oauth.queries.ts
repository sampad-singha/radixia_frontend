import { useMutation } from "@tanstack/react-query"
import { exchangeOAuthCode } from "../services/oauth.service"

export const useOAuthLogin = () =>
    useMutation({
        mutationFn: ({provider, code}: {
            provider: string
            code: string
        }) => exchangeOAuthCode(provider, code)
    })