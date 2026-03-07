import { useState } from "react"
import { useSudoStatus } from "../queries/sudo.queries"

export function useSudo() {

    const { data } = useSudoStatus()

    const [open, setOpen] = useState(false)
    const [callback, setCallback] = useState<(() => void) | null>(null)

    const requireSudo = (action: () => void) => {

        if (data?.confirmed) {
            action()
            return
        }

        setCallback(() => action)
        setOpen(true)
    }

    const complete = () => {

        setOpen(false)

        if (callback) {
            callback()
        }
    }

    return {
        open,
        methods: data?.available_methods ?? [],
        requireSudo,
        complete,
        close: () => setOpen(false)
    }
}