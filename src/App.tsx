import React, { useState, useEffect } from "react";
import { Conversation, CandidateProfile } from "./types";
import { initializeConversation } from "./services/conversationService";
import { extractCandidateProfile } from "./services/mockApi";
import { jobDescription } from "./data/jobDescription";
import ChatInterface from "./components/ChatInterface";
import CandidateSummary from "./components/CandidateSummary";
import JobDescription from "./components/JobDescription";

function App() {
  const [conversation, setConversation] = useState<Conversation>(() =>
    initializeConversation()
  );
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(
    {}
  );
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (conversation.messages.length > 1) {
      const profile = extractCandidateProfile(conversation.messages);
      setCandidateProfile(profile);
    }
  }, [conversation]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Candidate Engagement Chatbot
          </h1>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[600px]">
              <ChatInterface
                conversation={conversation}
                onConversationUpdate={setConversation}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </div>

            <div className="space-y-8">
              <CandidateSummary profile={candidateProfile} />
              <JobDescription job={jobDescription} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 TechSolutions Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
