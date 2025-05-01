export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
}

export interface CandidateProfile {
  name?: string;
  experience?: string[];
  skills?: string[];
  education?: string[];
  interests?: string[];
  strengths?: string[];
  preferences?: string[];
  availability?: string;
  questions?: string[];
}

export interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  salary: string;
}