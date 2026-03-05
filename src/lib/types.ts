export type ApiError = {
    message: string
    code: string
    errors?: Record<string, string[]>
}

export type User = {
    id: string
    name: string
    email: string
}

export type LoginResponse = {
    token: string
    user?: User
    mfa_required?: boolean
    available_methods?: string[]
}

export type RegisterResponse = {
    token: string
    user: {
        id: string
        name: string
        email: string
    }
}