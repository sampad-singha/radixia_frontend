type Listener = () => void

let listener: Listener | null = null

export const verifiedBus = {

    subscribe(fn: Listener) {
        listener = fn
    },

    trigger() {
        listener?.()
    }

}