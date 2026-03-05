import { useMutation } from "@tanstack/react-query"
import { sendMfaChallenge } from "@/features/authentication/services/mfa.service.ts"

export const useSendMfaChallenge = () =>
    useMutation({
        mutationFn: (type: string) => sendMfaChallenge(type)
    })