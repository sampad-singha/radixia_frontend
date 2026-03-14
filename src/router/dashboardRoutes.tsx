import ProtectedRoute from "@/components/ProtectedRoute.tsx"
import type { RouteObject } from "react-router-dom"

import PrivacySecurityPage from "@/pages/PrivacySecurityPage.tsx"
import DashboardLayout from "@/layouts/DashboardLayout.tsx"
import DashboardPage from "@/pages/DashboardPage.tsx"
import ExplorePage from "@/pages/ExplorePage.tsx";
import ProgramDetailPage from "@/pages/ProgramDetailPage.tsx";

export const dashboardRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            // Public routes

            // Protected routes
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
                    {
                        path: "explore/program/:slug",
                        element: <ProgramDetailPage />,
                    },
                ],
            },
        ],
    },
]