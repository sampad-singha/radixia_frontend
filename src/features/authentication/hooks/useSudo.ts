import { useContext } from "react"
import { SudoContext } from "../context/SudoContext"

export const useSudo = () => {

    const ctx = useContext(SudoContext)

    if (!ctx) {
        throw new Error("useSudo must be used inside SudoProvider")
    }

    return ctx
}