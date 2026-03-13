import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {queryClient} from "./lib/query-client"
import {AuthProvider} from "@/context/AuthContext.tsx";
import "./index.css"
import {VerifyProvider} from "@/features/authentication/context/VerifyEmailContext.tsx";
import {ThemeProvider} from "next-themes";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // defaultTheme="system"
            enableSystem
            storageKey="radixia-theme"
            disableTransitionOnChange
        >
            <TooltipProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <VerifyProvider>
                            <App/>
                        </VerifyProvider>
                    </AuthProvider>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </TooltipProvider>
        </ThemeProvider>
    </React.StrictMode>
)