import type {RouteObject} from "react-router-dom"

import LoginPage from "../pages/auth/LoginPage.tsx"
import RegisterPage from "../pages/auth/RegisterPage.tsx"
import VerifyMfaPage from "../pages/auth/VerifyMfaPage.tsx"
import OAuthCallbackPage from "@/pages/auth/OAuthCallbackPage.tsx";
import EmailVerifiedPage from "@/pages/auth/EmailVerifiedPage.tsx";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage.tsx";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage.tsx";

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
    {
        path: "/email-verified",
        element: <EmailVerifiedPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    }
]