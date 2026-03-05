import type {RouteObject} from "react-router-dom"

import ProfilePage from "../screens/ProfilePage"
import ProtectedRoute from "@/components/ProtectedRoute"

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