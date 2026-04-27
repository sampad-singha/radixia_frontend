import Routes from "@/router/routes"
import VerifyEmailReminder from "@/components/features/auth/VerifyEmailReminder.tsx";
import {Toaster} from "sonner";

export default function App() {
    return (
        <>
            <Routes />
            <Toaster
                position="top-center"
                richColors
            />
            <VerifyEmailReminder />
        </>
    )
}