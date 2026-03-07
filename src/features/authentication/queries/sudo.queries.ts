import { useQuery, useMutation } from "@tanstack/react-query"
import { getSudoUser, confirmSudo } from "../services/sudo.service"

export const useSudoStatus = () =>
    useQuery({
        queryKey: ["sudo-status"],
        queryFn: getSudoUser
    })

export const useConfirmSudo = () =>
    useMutation({
        mutationFn: confirmSudo
    })