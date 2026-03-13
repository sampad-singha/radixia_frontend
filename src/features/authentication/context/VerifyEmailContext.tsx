import { createContext, useContext, useEffect, useState } from "react"
import { verifiedBus } from "@/lib/verifiedBus"

const VerifyContext = createContext<any>(null)

export function VerifyProvider({ children }: any) {

    const [show, setShow] = useState(false)

    useEffect(() => {

        verifiedBus.subscribe(() => {
            setShow(true)
        })

    }, [])

    return (
        <VerifyContext.Provider value={{ show, close: () => setShow(false) }}>
            {children}
        </VerifyContext.Provider>
    )
}

export const useVerifyEmail = () => useContext(VerifyContext)