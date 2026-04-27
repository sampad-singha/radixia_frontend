import {useMutation, useQuery} from "@tanstack/react-query"
import {
    confirmMfa,
    disableMfa,
    enableMfa, getRecoveryCodes,
    getTwoFactorMethods, regenerateRecoveryCodes,
    sendMfaChallenge
} from "@/services/auth/mfa.service.ts"
import {verifyLogin} from "@/services/auth/auth.service.ts";
import type {ApiError, MfaType} from "@/lib/types/types.ts";

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
        mutationFn: ({ type, code }: { type: MfaType; code: string }) =>
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

export const useRecoveryCodes = () =>
    useMutation({
        mutationFn: getRecoveryCodes
    })