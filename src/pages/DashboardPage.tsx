import DashboardGreeting from "@/components/features/dashboard/Dashboardgreeting.tsx";
import DashboardStats from "@/components/features/dashboard/Dashboardstats.tsx";
import DashboardHeroRow from "@/components/features/dashboard/Dashboardherorow.tsx";
import DashboardActivityChart from "@/components/features/dashboard/Dashboardactivitychart.tsx";
import DashboardLearningRow from "@/components/features/dashboard/Dashboardlearningrow.tsx";
import DashboardRecommended from "@/components/features/dashboard/Dashboardrecommended.tsx";


export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto p-5 space-y-5">
            <DashboardGreeting />
            <DashboardStats />
            <DashboardHeroRow />
            <DashboardLearningRow />
            <DashboardActivityChart />
            <DashboardRecommended />
        </div>
    )
}