import type {RouteObject} from "react-router-dom"

import ProfilePage from "../pages/ProfilePage.tsx"
import ProtectedRoute from "@/components/ProtectedRoute.tsx"

export const profileRoutes: RouteObject[] = [
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        ),
    },
]