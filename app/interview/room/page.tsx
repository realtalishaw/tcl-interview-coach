"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AIJudge } from "@/components/interview/ai-judge";
import { VideoControls } from "@/components/interview/video-controls";
import { VideoOff } from "lucide-react";
import InterviewChat from "@/components/InterviewChat";

const judge = {
  id: 1,
  name: "Coach Max",
  title: "AI Interview Coach",
  image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
};

export default function InterviewRoom() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isJudgeAsking, setIsJudgeAsking] = useState(false);
  const [isJudgeSpeaking, setIsJudgeSpeaking] = useState(false);
  const [lastAIMessage, setLastAIMessage] = useState<string>("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else if (timeLeft === 0) {
      router.push("/interview/feedback");
    }
  }, [isRecording, timeLeft, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMicrophone = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleStatusChange = (status: string) => {
    console.log('Status update:', status);
    if (status === 'speaking') {
      setIsJudgeSpeaking(true);
      setIsJudgeAsking(false);
    } else if (status === 'listening') {
      setIsJudgeSpeaking(false);
      setIsJudgeAsking(true);
    } else {
      setIsJudgeSpeaking(false);
      setIsJudgeAsking(false);
    }
  };

  const handleAIMessage = (message: string) => {
    console.log('AI Message:', message);
    setLastAIMessage(message);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative h-full flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
          />
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <VideoOff className="h-24 w-24 text-gray-600" />
            </div>
          )}
        </div>

        <div className="absolute top-8 right-8 z-10 w-80">
          <AIJudge
            name={judge.name}
            title={judge.title}
            image={judge.image}
            isAsking={isJudgeAsking}
            isSpeaking={isJudgeSpeaking}
            lastMessage={lastAIMessage}
          />
          {isRecording && (
            <div className="mt-4">
              <InterviewChat 
                isRecording={isRecording} 
                onStatusChange={handleStatusChange}
                onAIMessage={handleAIMessage}
              />
            </div>
          )}
        </div>

        <div className="absolute top-8 left-8 z-10">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {isRecording ? formatTime(timeLeft) : "Ready"}
          </div>
        </div>

        {!isRecording ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Button
              size="lg"
              className="bg-pink-500 hover:bg-pink-600 text-white"
              onClick={() => setIsRecording(true)}
            >
              Start Interview
            </Button>
          </div>
        ) : (
          <VideoControls
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            onToggleMicrophone={toggleMicrophone}
            onToggleVideo={toggleVideo}
            onEnd={() => router.push("/interview/feedback")}
          />
        )}
      </div>
    </div>
  );
}