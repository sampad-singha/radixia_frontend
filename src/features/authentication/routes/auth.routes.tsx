import type {RouteObject} from "react-router-dom"

import LoginPage from "../screens/LoginPage"
import RegisterPage from "../screens/RegisterPage"
import VerifyMfaPage from "../screens/VerifyMfaPage"
import OAuthCallbackPage from "@/features/authentication/screens/OAuthCallbackPage.tsx";

export const authRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/verify-mfa",
        element: <VerifyMfaPage />,
    },
    {
        path: "/auth/:provider/callback",
        element: <OAuthCallbackPage />
    },
]