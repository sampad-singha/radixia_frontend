import TwoFactorSection from "@/features/dashboard/components/TwoFactorSection.tsx";

export default function PrivacySecurityPage() {

    return (

        <div className="space-y-8">

            <h1 className="text-2xl font-semibold">
                Privacy & Security
            </h1>

            <TwoFactorSection />

        </div>

    )

}