"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Mar 1", score: 75 },
  { date: "Mar 5", score: 78 },
  { date: "Mar 10", score: 82 },
  { date: "Mar 15", score: 80 },
  { date: "Mar 20", score: 85 },
  { date: "Mar 25", score: 88 },
];

export function ProgressChart() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Progress Over Time</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}