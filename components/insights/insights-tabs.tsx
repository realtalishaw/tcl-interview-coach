"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PresenceAnalysis } from "./presence-analysis";

const speechMetrics = {
  fillerWords: {
    count: 12,
    trend: -3,
    data: [
      { date: "Mar 1", count: 18 },
      { date: "Mar 5", count: 15 },
      { date: "Mar 10", count: 14 },
      { date: "Mar 15", count: 12 },
    ]
  },
  pace: {
    wpm: 145,
    optimal: true,
    data: [
      { date: "Mar 1", wpm: 160 },
      { date: "Mar 5", wpm: 155 },
      { date: "Mar 10", wpm: 150 },
      { date: "Mar 15", wpm: 145 },
    ]
  },
  clarity: {
    score: 85,
    data: [
      { date: "Mar 1", score: 75 },
      { date: "Mar 5", score: 78 },
      { date: "Mar 10", score: 82 },
      { date: "Mar 15", score: 85 },
    ]
  }
};

export function InsightsTabs() {
  return (
    <Tabs defaultValue="speech">
      <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
        <TabsTrigger value="speech">Speech Analysis</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="presence">Presence</TabsTrigger>
      </TabsList>

      <TabsContent value="speech" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Filler Words</h3>
            <div className="text-2xl font-bold mb-2">{speechMetrics.fillerWords.count}</div>
            <div className="text-sm text-green-500 mb-4">
              {speechMetrics.fillerWords.trend} from last session
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={speechMetrics.fillerWords.data}>
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Speaking Pace</h3>
            <div className="text-2xl font-bold mb-2">{speechMetrics.pace.wpm} WPM</div>
            <div className="text-sm text-green-500 mb-4">
              Optimal range
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={speechMetrics.pace.data}>
                  <Line type="monotone" dataKey="wpm" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Clarity Score</h3>
            <div className="text-2xl font-bold mb-2">{speechMetrics.clarity.score}%</div>
            <Progress value={speechMetrics.clarity.score} className="mb-4" />
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={speechMetrics.clarity.data}>
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="content">
        <div className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Content Analysis Coming Soon</h3>
            <p className="text-gray-500">We're working on advanced content analysis features to help you improve your answers.</p>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="presence">
        <div className="mt-6">
          <PresenceAnalysis />
        </div>
      </TabsContent>
    </Tabs>
  );
}