import { Outlet } from "react-router-dom"
import DashboardSidebar from "./DashboardSidebar"
import SudoModal from "@/features/authentication/components/SudoModal"
import { SudoProvider } from "@/features/authentication/context/SudoContext"
import {useSudo} from "@/features/authentication/hooks/useSudo.ts";

function LayoutContent() {

    const sudo = useSudo()

    return (
        <div className="flex min-h-screen bg-muted/40">

            <DashboardSidebar />

            <main className="flex-1 p-8">
                <Outlet />
            </main>

            <SudoModal
                open={sudo.open}
                methods={sudo.methods}
                onConfirm={sudo.confirm}
                onClose={sudo.close}
            />

        </div>
    )
}

export default function DashboardLayout() {

    return (
        <SudoProvider>
            <LayoutContent />
        </SudoProvider>
    )
}