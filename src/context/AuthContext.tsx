import { createContext, useContext } from "react"
import { useUser } from "@/queries/auth.queries"

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