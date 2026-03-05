import type {RouteObject} from "react-router-dom"
import LandingPage from "@/features/public/screens/LandingPage.tsx";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LandingPage />,
    }
]