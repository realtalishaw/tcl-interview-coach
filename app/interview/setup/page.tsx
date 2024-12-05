"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

const pageants = [
  { id: "miss-universe", name: "Miss Universe" },
  { id: "miss-world", name: "Miss World" },
  { id: "miss-international", name: "Miss International" },
  { id: "general", name: "General Practice" },
];

export default function InterviewSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    pageant: "",
    timeLimit: "180", // Default to 3 minutes
    backgroundInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage
    localStorage.setItem('interviewSetup', JSON.stringify(formData));
    router.push("/interview/room");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center py-12">
      <div className="w-full max-w-2xl px-4">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Interview Setup</h2>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Select Pageant</Label>
                  <Select
                    value={formData.pageant}
                    onValueChange={(value) => setFormData({ ...formData, pageant: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a pageant" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageants.map((pageant) => (
                        <SelectItem key={pageant.id} value={pageant.id}>
                          {pageant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.pageant === "general" && (
                  <div>
                    <Label>Time Limit (minutes)</Label>
                    <Select
                      value={formData.timeLimit}
                      onValueChange={(value) => setFormData({ ...formData, timeLimit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="180">3 minutes</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="600">10 minutes</SelectItem>
                        <SelectItem value="900">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" className="flex-1" onClick={() => setStep(3)}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Upload Your Resume/Bio</h3>
                  <p className="text-gray-600">
                    Help us personalize your interview experience by sharing your background
                  </p>
                </div>

                <Tabs defaultValue="resume" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="resume">Upload</TabsTrigger>
                    <TabsTrigger value="questions">Write</TabsTrigger>
                    <TabsTrigger value="skip">Skip</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="resume">
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop your resume/bio here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supported formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                        <Input type="file" className="hidden" accept=".pdf,.doc,.docx" id="file-upload" />
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="questions">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Don't have a resume? No problem! Tell us about your background, achievements, and aspirations.
                      </p>
                      <textarea
                        className="w-full h-32 p-2 border rounded-md"
                        placeholder="Tell us about yourself..."
                        value={formData.backgroundInfo}
                        onChange={(e) => setFormData({ ...formData, backgroundInfo: e.target.value })}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="skip">
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        You can proceed without providing background information. 
                        The interview will use general questions.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Start Interview
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}