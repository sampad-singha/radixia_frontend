import {useQuery, useMutation} from "@tanstack/react-query"
import {login, register, getMe, logout} from "@/services/auth.service"

export const useUser = () =>
    useQuery({
        queryKey: ["user"],
        queryFn: getMe
    })

export const useLogin = () =>
    useMutation({
        mutationFn: ({email, password}: { email: string; password: string }) =>
            login(email, password)
    })

export const useRegister = () =>
    useMutation({
        mutationFn: ({name, email, password, password_confirmation}: {
            name: string
            email: string
            password: string
            password_confirmation: string
        }) =>
            register(name, email, password, password_confirmation)
    })


export const useLogout = () =>
    useMutation({
        mutationFn: logout
    })