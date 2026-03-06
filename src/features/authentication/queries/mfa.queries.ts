import {useMutation, useQuery} from "@tanstack/react-query"
import {
    confirmMfa,
    disableMfa,
    enableMfa,
    getTwoFactorMethods, regenerateRecoveryCodes,
    sendMfaChallenge
} from "@/features/authentication/services/mfa.service.ts"
import {verifyLogin} from "@/features/authentication/services/auth.service.ts";
import type {ApiError} from "@/lib/types.ts";

export const useVerifyLogin = () =>
    useMutation<
        any,
        ApiError,
        { type: string; code: string }
    >({
        mutationFn: ({ type, code }) => verifyLogin(type, code)
    })

export const useSendMfaChallenge = () =>
    useMutation<
        any,
        ApiError,
        string
    >({
        mutationFn: (type) => sendMfaChallenge(type)
    })


export const useEnableMfa = () =>
    useMutation({
        mutationFn: enableMfa
    })

export const useConfirmMfa = () =>
    useMutation({
        mutationFn: ({ type, code }: { type: string; code: string }) =>
            confirmMfa(type, code)
    })

export const useDisableMfa = () =>
    useMutation({
        mutationFn: disableMfa
    })

export const useTwoFactorMethods = () =>
    useQuery({
        queryKey: ["mfa-methods"],
        queryFn: getTwoFactorMethods
    })

export const useRegenerateRecoveryCodes = () =>
    useMutation({
        mutationFn: regenerateRecoveryCodes
    })