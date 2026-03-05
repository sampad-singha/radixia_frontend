import type {RouteObject} from "react-router-dom"

import LoginPage from "../screens/LoginPage"
import RegisterPage from "../screens/RegisterPage"
import VerifyMfaPage from "../screens/VerifyMfaPage"

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
]