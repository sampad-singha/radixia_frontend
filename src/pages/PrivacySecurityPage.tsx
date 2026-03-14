import TwoFactorSection from "@/components/features/auth/TwoFactorSection.tsx";
import ChangePasswordSection from "@/components/features/auth/ChangePasswordSection.tsx";
import SetPasswordCard from "@/components/features/auth/SetPasswordCard.tsx";
import {useUser} from "@/queries/auth/auth.queries.ts";
import SessionsSection from "@/components/features/auth/SessionsSection.tsx";
import EmailSection from "@/components/features/auth/EmailSection.tsx";

export default function PrivacySecurityPage() {

    const { data: user } = useUser()

    return (

        <div className="space-y-8 px-4">

            <h1 className="text-2xl font-semibold">
                Privacy & Security
            </h1>

            <EmailSection />

            <TwoFactorSection />

            {user?.is_password_set
                ? <ChangePasswordSection />
                : <SetPasswordCard />
            }

            <SessionsSection />

        </div>

    )

}