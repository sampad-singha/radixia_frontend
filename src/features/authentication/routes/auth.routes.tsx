import type {RouteObject} from "react-router-dom"

import LoginPage from "../screens/LoginPage"
import RegisterPage from "../screens/RegisterPage"
import VerifyMfaPage from "../screens/VerifyMfaPage"
import OAuthCallbackPage from "@/features/authentication/screens/OAuthCallbackPage.tsx";
import EmailVerifiedPage from "@/features/authentication/screens/EmailVerifiedPage.tsx";
import ForgotPasswordPage from "@/features/authentication/screens/ForgotPasswordPage.tsx";
import ResetPasswordPage from "@/features/authentication/screens/ResetPasswordPage.tsx";

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