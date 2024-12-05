import { InsightsTabs } from "@/components/insights/insights-tabs";
import { DetailedMetrics } from "@/components/insights/detailed-metrics";
import { AiSuggestions } from "@/components/insights/ai-suggestions";

export default function InsightsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Interview Insights</h1>
        <p className="text-gray-500">Detailed analysis of your interview performance</p>
      </div>

      <InsightsTabs />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <DetailedMetrics />
        </div>
        <div>
          <AiSuggestions />
        </div>
      </div>
    </div>
  );
}