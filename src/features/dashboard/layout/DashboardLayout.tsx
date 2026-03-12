import {Outlet} from "react-router-dom"
import SudoModal from "@/features/authentication/components/SudoModal"
import {SudoProvider} from "@/features/authentication/context/SudoContext"
import {useSudo} from "@/features/authentication/hooks/useSudo.ts";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/features/dashboard/layout/AppSidebar.tsx";
import {Header} from "@/components/header/Header.tsx";

function LayoutContent() {
    const sudo = useSudo()

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <div className="flex flex-1">
                    <AppSidebar/>
                    <SidebarInset>
                        <Header/>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            <div className="mx-auto w-full max-w-4xl">
                                <Outlet/>
                            </div>
                        </div>
                    </SidebarInset>
                    <SudoModal
                        open={sudo.open}
                        methods={sudo.methods}
                        onConfirm={sudo.confirm}
                        onClose={sudo.close}
                    />
                </div>
            </SidebarProvider>
        </div>
    )
}

export default function DashboardLayout() {

    return (
        <SudoProvider>
            <LayoutContent/>
        </SudoProvider>
    )
}