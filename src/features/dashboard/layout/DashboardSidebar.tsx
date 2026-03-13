import { NavLink } from "react-router-dom"

export default function DashboardSidebar() {

    const linkClass =
        "block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"

    const activeClass =
        "bg-muted"

    return (

        <aside className="w-64 border-r bg-background p-6">

            <div className="mb-8 text-lg font-semibold">
                Dashboard
            </div>

            <nav className="space-y-6">

                {/* Dashboard section */}

                <div className="space-y-2">

                    <div className="text-xs font-semibold text-muted-foreground uppercase">
                        Dashboard
                    </div>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : ""}`
                        }
                    >
                        Overview
                    </NavLink>

                </div>

                {/* Account section */}

                <div className="space-y-2">

                    <div className="text-xs font-semibold text-muted-foreground uppercase">
                        Account
                    </div>

                    <NavLink
                        to="/account/general"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : ""}`
                        }
                    >
                        General
                    </NavLink>

                    <NavLink
                        to="/account/privacy-security"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : ""}`
                        }
                    >
                        Privacy & Security
                    </NavLink>

                    <NavLink
                        to="/account/notifications"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : ""}`
                        }
                    >
                        Notifications
                    </NavLink>

                </div>

            </nav>

        </aside>
    )
}