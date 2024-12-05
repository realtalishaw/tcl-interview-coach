"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic2, Clock, Award, ChevronRight } from "lucide-react";
import Link from "next/link";

const practiceTypes = [
  {
    id: "personal-intro",
    title: "Personal Introduction",
    description: "Practice your 30-second elevator pitch and personal story",
    icon: Mic2,
    duration: "30-60 seconds",
    difficulty: "Beginner",
  },
  {
    id: "platform-speech",
    title: "Platform Speech",
    description: "Present your pageant platform and social impact initiatives",
    icon: Award,
    duration: "2-3 minutes",
    difficulty: "Intermediate",
  },
  {
    id: "spokesmodel",
    title: "Spokesmodel Presentation",
    description: "Deliver a professional spokesmodel presentation",
    icon: Clock,
    duration: "90 seconds",
    difficulty: "Advanced",
  },
];

export default function SpeakingPractice() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Speaking Practice</h1>
        <p className="text-gray-500">Choose a practice type to enhance your speaking skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Link key={type.id} href={`/speaking/${type.id}/setup`}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-pink-50">
                      <Icon className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {type.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {type.difficulty}
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Need Interview Practice?</h3>
            <p className="text-gray-600">Practice full pageant interview sessions with AI judges</p>
          </div>
          <Link href="/interview/setup">
            <Button>Start Interview Practice</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}