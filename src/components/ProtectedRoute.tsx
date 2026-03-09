import {Navigate} from "react-router-dom"
import {useAuth} from "@/context/AuthContext"
import {Loader2} from "lucide-react";

export default function ProtectedRoute({children}: any) {
    const {isAuthenticated, isLoading} = useAuth()

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-muted/40">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                    <span>Fetching Data...</span>
                </div>
            </div>
        )

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    return children
}