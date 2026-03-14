import type {RouteObject} from "react-router-dom"
import LandingPage from "@/pages/LandingPage.tsx";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LandingPage />,
    }
]