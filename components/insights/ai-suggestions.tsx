"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lightbulb, ThumbsUp, AlertTriangle, ChevronRight } from "lucide-react";

const suggestions = [
  {
    type: "strength",
    icon: ThumbsUp,
    title: "Strong Voice Modulation",
    content: "Your voice modulation has improved significantly, adding more engagement to your answers.",
    details: [
      "Effective use of pitch variation to emphasize key points",
      "Natural rhythm and pacing throughout responses",
      "Clear emotional connection through vocal expression"
    ]
  },
  {
    type: "improvement",
    icon: Lightbulb,
    title: "Current Events Integration",
    content: "Try incorporating more current events into your answers to showcase awareness.",
    details: [
      "Research recent developments in your platform areas",
      "Practice connecting personal experiences with current issues",
      "Prepare 2-3 relevant current event examples for common questions"
    ]
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Example Repetition",
    content: "Watch for slight repetition in your community service examples.",
    details: [
      "Diversify your volunteer experience examples",
      "Focus on different aspects of each experience",
      "Prepare multiple examples for similar question types"
    ]
  }
];

export function AiSuggestions() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">AI Coaching Insights</h2>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`
                      mt-1 p-1.5 rounded-full
                      ${suggestion.type === "strength" ? "bg-green-100 text-green-600" : ""}
                      ${suggestion.type === "improvement" ? "bg-blue-100 text-blue-600" : ""}
                      ${suggestion.type === "warning" ? "bg-yellow-100 text-yellow-600" : ""}
                    `}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{suggestion.title}</h3>
                      <p className="text-sm text-gray-600">{suggestion.content}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Icon className={`h-5 w-5
                      ${suggestion.type === "strength" ? "text-green-600" : ""}
                      ${suggestion.type === "improvement" ? "text-blue-600" : ""}
                      ${suggestion.type === "warning" ? "text-yellow-600" : ""}
                    `} />
                    {suggestion.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">{suggestion.content}</p>
                  <div className="space-y-3">
                    {suggestion.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-pink-500 mt-2" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Add to Practice Focus</Button>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </Card>
  );
}