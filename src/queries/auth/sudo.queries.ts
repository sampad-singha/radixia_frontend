import { useQuery, useMutation } from "@tanstack/react-query"
import { getSudoUser, confirmSudo } from "../../services/auth/sudo.service.ts"

export const useSudoStatus = () =>
    useQuery({
        queryKey: ["sudo-status"],
        queryFn: getSudoUser
    })

export const useConfirmSudo = () =>
    useMutation({
        mutationFn: confirmSudo
    })