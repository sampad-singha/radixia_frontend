type AuthMethod = "password" | "email" | "totp"

type Listener = (
    request: any,
    methods: AuthMethod[],
    reject: (reason?: any) => void
) => void

let listener: Listener | null = null

export const sudoBus = {

    subscribe(fn: Listener) {
        listener = fn
    },

    trigger(
        request: any,
        methods: AuthMethod[],
        reject: (reason?: any) => void
    ) {
        listener?.(request, methods, reject)
    }

}