import {BrowserRouter, useRoutes} from "react-router-dom"

import {authRoutes} from "@/features/authentication/routes/auth.routes"
import {profileRoutes} from "@/features/profile/routes/profile.routes.tsx";
import {publicRoutes} from "@/features/public/routes/public.routes.tsx";

function AppRouter() {
    return useRoutes([
        ...authRoutes,
        ...profileRoutes,
        ...publicRoutes,
    ])
}

export default function Routes() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}