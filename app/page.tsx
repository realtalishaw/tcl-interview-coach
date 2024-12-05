import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { RecentSessions } from "@/components/dashboard/recent-sessions";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Jane</h1>
          <p className="text-gray-500">Track your progress and start a new practice session</p>
        </div>
        <Link href="/interview/setup">
          <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
            Start New Interview
          </Button>
        </Link>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ProgressChart />
        <RecentSessions />
      </div>
    </div>
  );
}