"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, X } from "lucide-react";

interface VideoControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMicrophone: () => void;
  onToggleVideo: () => void;
  onEnd: () => void;
}

export function VideoControls({
  isMuted,
  isVideoOff,
  onToggleMicrophone,
  onToggleVideo,
  onEnd,
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 p-4 rounded-full bg-black/50 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon"
        className={`hover:bg-white/10 ${isMuted ? 'bg-red-500/50 text-white' : 'text-white'}`}
        onClick={onToggleMicrophone}
      >
        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`hover:bg-white/10 ${isVideoOff ? 'bg-red-500/50 text-white' : 'text-white'}`}
        onClick={onToggleVideo}
      >
        {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-red-500/50 text-white"
        onClick={onEnd}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}