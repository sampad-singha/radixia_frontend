import { createContext, useContext } from "react"
import { useUser } from "@/features/authentication/queries/auth.queries.ts"

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: any) {
    const { data: user, isLoading } = useUser()

    const isAuthenticated = !!user

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)