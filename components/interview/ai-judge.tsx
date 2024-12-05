"use client";

import { Card } from "@/components/ui/card";

interface AIJudgeProps {
  name: string;
  title: string;
  image: string;
  isAsking: boolean;
  isSpeaking?: boolean;
  lastMessage?: string;
}

export function AIJudge({ 
  name, 
  title, 
  image, 
  isAsking, 
  isSpeaking, 
  lastMessage 
}: AIJudgeProps) {
  return (
    <div className="relative">
      {isSpeaking && (
        <>
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-pulse bg-gradient-radial from-pink-500/50 via-pink-500/30 to-transparent rounded-lg blur-md" />
          </div>
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 animate-ping bg-gradient-to-r from-pink-500/10 via-pink-500/20 to-pink-500/10 rounded-lg" />
          </div>
        </>
      )}
      <div className={`bg-black/50 backdrop-blur-sm rounded-lg p-4 transition-all duration-200 ${isSpeaking ? 'ring-2 ring-pink-500/50' : ''}`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {isAsking && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            )}
            {isSpeaking && (
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-white">{name}</h3>
            <p className="text-sm text-gray-300">{title}</p>
          </div>
        </div>
        {lastMessage && (
          <div className="mt-3 text-sm text-gray-200 p-3 rounded bg-black/40 border border-pink-500/20">
            {lastMessage}
          </div>
        )}
      </div>
    </div>
  );
}