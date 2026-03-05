import { useUser } from "@/queries/auth.queries"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/queries/auth.queries"

export default function ProfilePage() {

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
                onClick={() => logout.mutate()}
            >
                Logout
            </Button>

        </div>
    )
}