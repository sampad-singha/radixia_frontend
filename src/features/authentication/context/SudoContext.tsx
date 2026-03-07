import {createContext, useContext, useEffect, useRef, useState} from "react"
import { confirmSudo } from "../services/sudo.service"
import { sudoBus } from "@/lib/sudoBus"
import { api } from "@/lib/api"
import {useQueryClient} from "@tanstack/react-query";

type AuthMethod = "password" | "email" | "totp"

type SudoContextType = {
    open: boolean
    methods: AuthMethod[]
    confirm: (type: AuthMethod, value?: string) => Promise<void>
    close: () => void
}

const SudoContext = createContext<SudoContextType | null>(null)

export function SudoProvider({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false)
    const [methods, setMethods] = useState<AuthMethod[]>([])
    const [pendingRequest, setPendingRequest] = useState<any>(null)
    const queryClient = useQueryClient()
    const rejectRef = useRef<(reason?: any) => void>()

    useEffect(() => {

        sudoBus.subscribe((request, availableMethods, reject) => {

            rejectRef.current = reject

            setPendingRequest(request)
            setMethods(availableMethods || [])
            setOpen(true)

        })

    }, [])

    const confirm = async (type: AuthMethod, value?: string) => {

        await confirmSudo({ type, value })

        setOpen(false)

        if (pendingRequest) {

            await api(pendingRequest)

            setPendingRequest(null)

            queryClient.invalidateQueries({
                queryKey: ["mfa-methods"]
            })

        }

    }

    const close = () => {

        setOpen(false)

        setPendingRequest(null)

        if (rejectRef.current) {
            rejectRef.current({ message: "Sudo cancelled" })
            rejectRef.current = undefined
        }

    }

    return (
        <SudoContext.Provider
            value={{
                open,
                methods,
                confirm,
                close
            }}
        >
            {children}
        </SudoContext.Provider>
    )
}

export const useSudo = () => {

    const ctx = useContext(SudoContext)

    if (!ctx) {
        throw new Error("useSudo must be used inside SudoProvider")
    }

    return ctx
}