"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Eye, Smile, HandMetal } from "lucide-react";

const presenceMetrics = [
  {
    category: "Eye Contact",
    score: 88,
    icon: Eye,
    details: [
      "Maintained consistent eye contact with judges",
      "Natural scanning pattern across panel",
      "Avoided looking down during responses"
    ]
  },
  {
    category: "Facial Expressions",
    score: 92,
    icon: Smile,
    details: [
      "Genuine smile throughout interview",
      "Appropriate emotional responses",
      "Engaged and attentive expressions"
    ]
  },
  {
    category: "Body Language",
    score: 85,
    icon: HandMetal,
    details: [
      "Open and confident posture",
      "Effective hand gestures",
      "Minimal nervous movements"
    ]
  },
  {
    category: "Camera Presence",
    score: 90,
    icon: Camera,
    details: [
      "Strong virtual presence",
      "Good framing and positioning",
      "Professional background setup"
    ]
  }
];

export function PresenceAnalysis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {presenceMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.category} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-pink-50">
                <Icon className="h-5 w-5 text-pink-500" />
              </div>
              <h3 className="font-semibold">{metric.category}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Score</span>
                  <span className="font-medium">{metric.score}%</span>
                </div>
                <Progress value={metric.score} className="h-2" />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{metric.category} Analysis</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="h-5 w-5 text-pink-500" />
                      <span className="text-xl font-semibold">{metric.score}%</span>
                    </div>
                    <Progress value={metric.score} className="mb-6" />
                    <div className="space-y-3">
                      {metric.details.map((detail, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-pink-500 mt-2" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        );
      })}
    </div>
  );
}