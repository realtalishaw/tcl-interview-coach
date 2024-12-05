import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    category: "Voice Quality",
    metrics: [
      { name: "Pitch Variation", score: 85 },
      { name: "Volume Control", score: 90 },
      { name: "Tone Consistency", score: 88 },
    ],
  },
  {
    category: "Speech Pattern",
    metrics: [
      { name: "Pronunciation", score: 92 },
      { name: "Articulation", score: 87 },
      { name: "Rhythm", score: 85 },
    ],
  },
  {
    category: "Content Structure",
    metrics: [
      { name: "Answer Relevance", score: 95 },
      { name: "Example Quality", score: 88 },
      { name: "Time Management", score: 82 },
    ],
  },
];

export function DetailedMetrics() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Detailed Performance Metrics</h2>
      <div className="space-y-8">
        {metrics.map((category) => (
          <div key={category.category}>
            <h3 className="font-medium mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.metrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{metric.name}</span>
                    <span className="text-sm font-medium">{metric.score}%</span>
                  </div>
                  <Progress value={metric.score} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}