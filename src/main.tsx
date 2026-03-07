import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {queryClient} from "./lib/query-client"
import {AuthProvider} from "@/context/AuthContext.tsx";
import "./index.css"
import {VerifyProvider} from "@/features/authentication/context/VerifyEmailContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <VerifyProvider>
                    <App />
                </VerifyProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>
)