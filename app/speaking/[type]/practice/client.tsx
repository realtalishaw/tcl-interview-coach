"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic2, Video } from "lucide-react";

export default function ClientPractice() {
  const params = useParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // Default to 90 seconds

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      router.push(`/speaking/${params.type}/feedback`);
    }
  }, [isRecording, timeLeft, router, params.type]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startPractice = () => {
    setIsRecording(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2 p-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {isRecording ? formatTime(timeLeft) : "Ready"}
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Mic2 className="h-6 w-6 text-pink-500" />
              <h2 className="text-lg font-semibold">Practice Session</h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="text-sm text-gray-600">Camera Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <Mic2 className="h-4 w-4" />
                <span className="text-sm text-gray-600">Microphone Connected</span>
              </div>
            </div>

            {!isRecording ? (
              <Button onClick={startPractice} className="w-full">
                Start Practice
              </Button>
            ) : (
              <div className="space-y-4">
                <Card className="p-4 bg-gray-50">
                  <p className="text-center text-lg font-medium">
                    Deliver your speech naturally and confidently
                  </p>
                </Card>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}