import {useUser} from "@/queries/auth/auth.queries.ts"
import {Button} from "@/components/ui/button.tsx"
import {useLogout} from "@/queries/auth/auth.queries.ts"
import {useNavigate} from "react-router-dom";
import {Loader2} from "lucide-react";

export default function ProfilePage() {
    const navigate = useNavigate()
    const {data: user, isLoading} = useUser()
    const logout = useLogout()

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-muted/40">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                    <span>Fetching Data...</span>
                </div>
            </div>
        )

    return (
        <div className="p-10">

            <h1 className="text-xl font-semibold mb-4">Profile</h1>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>

            <Button
                className="mt-4"
                onClick={() =>
                    logout.mutate(undefined, {
                        onSuccess: () => navigate("/")
                    })
                }
            >
                Logout
            </Button>

        </div>
    )
}