"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Mic2, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClientFeedback() {
  const params = useParams();

  const mockFeedback = {
    overallScore: 88,
    categories: [
      { name: "Delivery", score: 90 },
      { name: "Content Structure", score: 85 },
      { name: "Time Management", score: 92 },
      { name: "Voice Quality", score: 88 },
    ],
    strengths: [
      "Excellent pace and natural delivery",
      "Strong opening and closing statements",
      "Effective use of vocal variety",
    ],
    improvements: [
      "Consider adding more specific examples",
      "Work on smoother transitions",
      "Maintain consistent eye contact",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <div className="text-center mb-8">
            <Mic2 className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Practice Feedback</h1>
            <p className="text-gray-600">Here's your personalized feedback and scoring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="text-5xl font-bold text-pink-500">
                    {mockFeedback.overallScore}
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {mockFeedback.categories.map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.score}%</span>
                    </div>
                    <Progress value={category.score} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Strengths</h2>
                <ul className="space-y-2">
                  {mockFeedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-yellow-400 mt-1" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
                <ul className="space-y-2">
                  {mockFeedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-pink-500 mt-2" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href={`/speaking/${params.type}/setup`}>
              <Button variant="outline">Practice Again</Button>
            </Link>
            <Link href="/speaking">
              <Button>Back to Speaking Practice</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}