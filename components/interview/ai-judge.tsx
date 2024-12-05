"use client";

import { Card } from "@/components/ui/card";

interface AIJudgeProps {
  name: string;
  title: string;
  image: string;
  isAsking: boolean;
}

export function AIJudge({ name, title, image, isAsking }: AIJudgeProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
            {isAsking && (
              <div className="absolute inset-0 -z-10">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-pink-500/30 animate-ping"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <p className="text-sm text-white/80">{title}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}