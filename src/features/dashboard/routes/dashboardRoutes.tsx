import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import type {RouteObject} from "react-router-dom";
import PrivacySecurityPage from "@/features/dashboard/screens/PrivacySecurityPage.tsx";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout.tsx";

export const dashboardRoutes: RouteObject[] = [
    {
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            // {
            //     path: "dashboard",
            //     element: <DashboardHome />,
            // },
            {
                path: "account/privacy-security",
                element: <PrivacySecurityPage />,
            },
            // {
            //     path: "account/general",
            //     element: <AccountGeneralPage />,
            // },
            // {
            //     path: "account/notifications",
            //     element: <AccountNotificationsPage />,
            // },
        ],
    },
]