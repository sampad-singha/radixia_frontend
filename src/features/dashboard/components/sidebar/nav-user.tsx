"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    Loader2
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"

import {Skeleton} from "@/components/ui/skeleton"

import {Link, useNavigate} from "react-router-dom"
import {useLogout} from "@/features/authentication/queries/auth.queries"
import {useQueryClient} from "@tanstack/react-query"
import {useAuth} from "@/context/AuthContext.tsx";

export function NavUser() {

    const {isMobile} = useSidebar()
    const {user} = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const logout = useLogout()

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                queryClient.removeQueries({queryKey: ["user"]})
                navigate("/login")
            }
        })
    }

    if (!user) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <Skeleton className="h-8 w-8 rounded-lg"/>

                        <div className="grid flex-1 gap-1">
                            <Skeleton className="h-3 w-24"/>
                            <Skeleton className="h-3 w-32"/>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>

                <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >

                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name}/>
                                <AvatarFallback className="rounded-lg">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.name}
                </span>

                                <span className="truncate text-xs">
                  {user.email}
                </span>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4"/>

                        </SidebarMenuButton>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >

                        <DropdownMenuLabel className="p-0 font-normal">

                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name}/>
                                    <AvatarFallback className="rounded-lg">
                                        {user.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.name}
                  </span>

                                    <span className="truncate text-xs">
                    {user.email}
                  </span>
                                </div>

                            </div>

                        </DropdownMenuLabel>

                        <DropdownMenuSeparator/>

                        <DropdownMenuGroup>

                            <DropdownMenuItem>
                                <Sparkles/>
                                Upgrade to Pro
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                        <DropdownMenuSeparator/>

                        <DropdownMenuGroup>

                            <DropdownMenuItem asChild>
                                <Link to="/account/privacy-security">
                                    <BadgeCheck/>
                                    Account
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <CreditCard/>
                                Billing
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Bell/>
                                Notifications
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                        <DropdownMenuSeparator/>

                        <DropdownMenuItem
                            onClick={handleLogout}
                            disabled={logout.isPending}
                        >
                            {logout.isPending
                                ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                : <LogOut/>
                            }

                            Log out
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </SidebarMenuItem>
        </SidebarMenu>
    )
}