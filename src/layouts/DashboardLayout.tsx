import {Outlet} from "react-router-dom"
import SudoModal from "@/components/features/auth/SudoModal.tsx"
import {SudoProvider} from "@/context/SudoContext.tsx"
import {useSudo} from "@/hooks/useSudo.ts";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/common/sidebar/AppSidebar.tsx";
import {Header} from "@/components/common/header/Header.tsx";

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
                            <div className="">
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