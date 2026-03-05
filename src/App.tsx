import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import VerifyMfaPage from "./pages/VerifyMfaPage"
import ProtectedRoute from "@/components/ProtectedRoute.tsx";

export default function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-mfa" element={<VerifyMfaPage />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    )
}