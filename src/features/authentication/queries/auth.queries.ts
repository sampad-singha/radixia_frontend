import {useQuery, useMutation} from "@tanstack/react-query"
import {login, register, getMe, logout} from "@/features/authentication/services/auth.service.ts"
import type {ApiError, LoginResponse, RegisterResponse} from "@/lib/types.ts";

export const useUser = () =>
    useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        enabled: !!localStorage.getItem("token"),
    })

export const useLogin = () =>
    useMutation<
        LoginResponse,
        ApiError,
        { email: string; password: string }
    >({
        mutationFn: ({ email, password }) => login(email, password)
    })

export const useRegister = () =>
    useMutation<
        RegisterResponse,
        ApiError,
        {
            name: string
            email: string
            password: string
            password_confirmation: string
        }
    >({
        mutationFn: (data) =>
            register(
                data.name,
                data.email,
                data.password,
                data.password_confirmation
            )
    })


export const useLogout = () =>
    useMutation({
        mutationFn: logout
    })