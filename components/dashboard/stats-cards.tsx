import { Card } from "@/components/ui/card";
import { Crown, Star, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    label: "Average Score",
    value: "85",
    icon: Star,
    trend: "+2.5%",
  },
  {
    label: "Total Sessions",
    value: "24",
    icon: Crown,
    trend: null,
  },
  {
    label: "Best Score",
    value: "92",
    icon: TrendingUp,
    trend: null,
  },
  {
    label: "Practice Hours",
    value: "12.5",
    icon: Clock,
    trend: "+1.2h",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-pink-500" />
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{stat.value}</span>
              {stat.trend && (
                <span className="text-sm text-green-500">{stat.trend}</span>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}