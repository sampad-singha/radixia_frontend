import TwoFactorSection from "@/features/dashboard/components/TwoFactorSection.tsx";
import ChangePasswordSection from "@/features/dashboard/components/ChangePasswordSection.tsx";
import SetPasswordCard from "@/features/dashboard/components/SetPasswordCard.tsx";
import {useUser} from "@/features/authentication/queries/auth.queries.ts";
import SessionsSection from "@/features/dashboard/components/SessionsSection.tsx";
import EmailSection from "@/features/dashboard/components/EmailSection.tsx";

export default function PrivacySecurityPage() {

    const { data: user } = useUser()

    return (

        <div className="space-y-8">

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