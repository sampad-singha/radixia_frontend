import ProtectedRoute from "@/components/ProtectedRoute"
import type { RouteObject } from "react-router-dom"

import PrivacySecurityPage from "@/features/dashboard/screens/PrivacySecurityPage"
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout"
import DashboardPage from "@/features/dashboard/screens/DashboardPage"
import ExplorePage from "@/features/explore/screens/ExplorePage.tsx";

export const dashboardRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        path: "account/privacy-security",
                        element: <PrivacySecurityPage />,
                    },
                    {
                        path: "explore",
                        element: <ExplorePage />,
                    },
                ],
            },
        ],
    },
]