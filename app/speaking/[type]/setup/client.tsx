"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic2, Clock, Award } from "lucide-react";

const practiceConfig = {
  "personal-intro": {
    title: "Personal Introduction",
    description: "Practice your elevator pitch and personal story",
    icon: Mic2,
    timeOptions: ["30", "45", "60"],
    defaultTime: "30",
  },
  "platform-speech": {
    title: "Platform Speech",
    description: "Present your pageant platform and initiatives",
    icon: Award,
    timeOptions: ["120", "150", "180"],
    defaultTime: "120",
  },
  "spokesmodel": {
    title: "Spokesmodel Presentation",
    description: "Deliver a professional spokesmodel presentation",
    icon: Clock,
    timeOptions: ["90", "120"],
    defaultTime: "90",
  },
};

export default function ClientSetup() {
  const params = useParams();
  const router = useRouter();
  const practiceType = params.type as keyof typeof practiceConfig;
  const config = practiceConfig[practiceType];

  const [formData, setFormData] = useState({
    title: "",
    duration: config.defaultTime,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/speaking/${practiceType}/practice`);
  };

  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-pink-50">
              <Icon className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{config.title}</h2>
              <p className="text-gray-500">{config.description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Speech Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your speech a title"
                required
              />
            </div>

            <div>
              <Label>Duration (seconds)</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {config.timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time} seconds
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Practice Notes (optional)</Label>
              <textarea
                id="notes"
                className="w-full h-32 p-2 border rounded-md"
                placeholder="Add any notes or key points you want to cover..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Start Practice
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}