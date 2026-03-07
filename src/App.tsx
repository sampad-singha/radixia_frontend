import Routes from "@/router/routes"
import VerifyEmailReminder from "@/features/authentication/components/VerifyEmailReminder.tsx";

export default function App() {
    return (
        <>
            <Routes />

            <VerifyEmailReminder />
        </>
    )
}