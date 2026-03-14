import {BrowserRouter, useRoutes} from "react-router-dom"

import {authRoutes} from "@/router/auth.routes.tsx"
import {profileRoutes} from "@/router/profile.routes.tsx";
import {publicRoutes} from "@/router/public.routes.tsx";
import {dashboardRoutes} from "@/router/dashboardRoutes.tsx";

function AppRouter() {
    return useRoutes([
        ...authRoutes,
        ...profileRoutes,
        ...publicRoutes,
        ...dashboardRoutes,
    ])
}

export default function Routes() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}