'use client';

import { useEffect, useState, useCallback } from 'react';
import { Conversation } from '@11labs/client';

interface Message {
  text: string;
  isUser: boolean;
}

interface InterviewChatProps {
  isRecording: boolean;
  onStatusChange?: (status: string) => void;
  onAIMessage?: (message: string) => void;
}

interface SetupData {
  name: string;
  age: string;
  pageant: string;
  timeLimit: string;
  backgroundInfo: string;
}

const InterviewChat = ({ isRecording, onStatusChange, onAIMessage }: InterviewChatProps) => {
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [setupData, setSetupData] = useState<SetupData | null>(null);

  useEffect(() => {
    const savedSetup = localStorage.getItem('interviewSetup');
    if (savedSetup) {
      setSetupData(JSON.parse(savedSetup));
    }
  }, []);

  const initializeConversation = useCallback(async () => {
    if (!setupData) return;

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const response = await fetch('/api/eleven-labs');
      const { signedUrl, error } = await response.json();

      if (error || !signedUrl) {
        throw new Error(error || 'Failed to get signed URL');
      }

      console.log('Starting Eleven Labs session...');
      const conv = await Conversation.startSession({
        signedUrl,
        overrides: {
          agent: {
            prompt: {
              prompt: `You are to act as Coach Vivienne, an experienced pageant interview coach and mock judge. Your task is to conduct a simulated pageant interview tailored to the candidate's age and the specific pageant they are competing in. Follow these instructions carefully:

1. Begin by reading the candidate's information:
<candidate_info>
Name: ${setupData.name}
Age: ${setupData.age}
Pageant: ${setupData.pageant}
Background Info: ${setupData.backgroundInfo || 'Not provided'}
</candidate_info>

2. Start the interview with a warm, professional greeting. Introduce yourself as Coach Vivienne and invite the candidate to introduce themselves.

3. Based on the candidate's age (${setupData.age}), choose appropriate questions:

${Number(setupData.age) < 18 ? `Use more approachable and fun questions focused on passions, aspirations, and character-building experiences, such as:
- "What inspired you to start participating in pageants?"
- "What does confidence mean to you, and how do you build it?"
- "If you could make one change in your community, what would it be and why?"` 
: `Use more in-depth questions about leadership, social impact, and personal growth, such as:
- "How would you use this title to make a positive difference in the world?"
- "What does success mean to you in this phase of your life?"
- "Tell me about a challenge you've overcome and what you learned from it."`}

4. Incorporate questions relevant to the ${setupData.pageant}. If you know of any specific themes or values associated with this pageant, include questions that reflect these. For example:
- "How do you think your participation in ${setupData.pageant} aligns with your personal values?"
- "What unique quality do you bring to ${setupData.pageant} that sets you apart from other candidates?"

5. After each of the candidate's responses, provide a follow-up question to encourage deeper reflection. Evaluate their answers based on:
- Confidence: Are they poised and self-assured?
- Clarity: Is their response clear and to the point?
- Content: Does their answer show thoughtfulness and understanding of the pageant's values?

6. Offer subtle, constructive guidance when needed. If the candidate struggles to expand on an answer, provide encouragement and gentle prompts to help them elaborate. For example:
<coaching>
"That's an interesting point, ${setupData.name}. Can you tell me more about how you came to that conclusion?"
"I like where you're going with that answer. How might you apply that idea to a real-world situation?"
</coaching>

7. Maintain a conversational and professional tone throughout the interview. Make the candidate feel both challenged and supported.

8. Stay in character as Coach Vivienne throughout the interaction. Simulate the experience of a real pageant interview while incorporating your expertise as a coach.

Remember to tailor your questions and approach based on the candidate's age, the specific pageant, and any background information provided. Your goal is to help the candidate feel prepared and confident for their actual ${setupData.pageant} interview.

${setupData.backgroundInfo ? `Use this background information to inform your questions: ${setupData.backgroundInfo}` : 'Since no background information was provided, focus on general pageant questions and the candidate\'s responses during the interview.'}`,
            },
            firstMessage: `Hello ${setupData.name}! How are you doing today?`,
          }
        },
        onConnect: () => {
          console.log('Connected to Eleven Labs');
          onStatusChange?.('connected');
        },
        onDisconnect: () => {
          console.log('Disconnected from Eleven Labs');
          onStatusChange?.('disconnected');
        },
        onMessage: (msg: any) => {
          console.log('Received message:', msg);
          const messageText = typeof msg === 'string' ? msg : msg.message;
          setMessages((prev) => [...prev, { text: messageText, isUser: false }]);
          onAIMessage?.(messageText);
        },
        onError: (err: any) => {
          console.error('Eleven Labs error:', err);
          const errorMessage = typeof err === 'string' ? err : err.message || 'Unknown error';
          setError(errorMessage);
        },
        onStatusChange: (newStatus: any) => {
          let status;
          if (typeof newStatus === 'object' && newStatus !== null) {
            status = newStatus.status || 'unknown';
          } else {
            status = String(newStatus);
          }
          console.log('Status changed:', status);
          onStatusChange?.(status);
        },
        onModeChange: (modeData: any) => {
          console.log('Mode changed:', modeData);
          const mode = typeof modeData === 'object' ? modeData.mode : modeData;
          if (mode === 'SPEAKING') {
            onStatusChange?.('speaking');
          } else if (mode === 'LISTENING') {
            onStatusChange?.('listening');
          }
        },
      });

      setConversation(conv);
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : err.message || 'Unknown error';
      setError(errorMessage);
      console.error('Error initializing conversation:', err);
    }
  }, [onStatusChange, onAIMessage, setupData]);

  useEffect(() => {
    if (isRecording && !conversation && setupData) {
      console.log('Starting conversation...');
      initializeConversation();
    }
  }, [isRecording, conversation, initializeConversation, setupData]);

  useEffect(() => {
    return () => {
      if (conversation) {
        console.log('Cleaning up conversation...');
        conversation.endSession();
      }
    };
  }, [conversation]);

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
      {error && (
        <div className="mb-2 text-sm text-red-400 bg-red-900/20 p-2 rounded">
          {error}
        </div>
      )}

      <div className="h-48 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded text-sm ${
              msg.isUser
                ? 'bg-pink-500/20 text-pink-100 ml-8'
                : 'bg-gray-800/50 text-gray-100 mr-8'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewChat; 