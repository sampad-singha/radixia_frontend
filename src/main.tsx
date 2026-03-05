import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {queryClient} from "./lib/query-client"
import {AuthProvider} from "@/context/AuthContext.tsx";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>
)