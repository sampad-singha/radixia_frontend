import type {RouteObject} from "react-router-dom"
import LandingPage from "@/pages/LandingPage.tsx";
import ExplorePage from "@/pages/ExplorePage.tsx";
import ProgramDetailPage from "@/pages/ProgramDetailPage.tsx";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/explore",
        element: <ExplorePage />
    },
    {
        path: "program/:slug",
        element: <ProgramDetailPage />,
    },
]