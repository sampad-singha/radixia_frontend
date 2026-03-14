import { useUser } from "@/queries/auth/auth.queries.ts"
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function DashboardPage() {
    const { data, isLoading, isError } = useUser()

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        )
    }
    console.log("isLoading:", isLoading)

    if (isError) return <div>Error loading user</div>

    const user = data?.data?.user

    return (
        <div>
            <h1>Dashboard</h1>

            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
        </div>
    )
}