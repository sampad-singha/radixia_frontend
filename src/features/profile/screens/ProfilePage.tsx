import { useUser } from "@/features/authentication/queries/auth.queries.ts"
import { Button } from "@/components/ui/button.tsx"
import { useLogout } from "@/features/authentication/queries/auth.queries.ts"
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate()
    const { data: user, isLoading } = useUser()
    const logout = useLogout()

    if (isLoading) return <p>Loading...</p>

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