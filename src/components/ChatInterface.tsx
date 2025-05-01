import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { Conversation } from "../types";
import MessageList from "./MessageList";
import {
  addUserMessage,
  getAssistantResponse,
} from "../services/conversationService";

interface ChatInterfaceProps {
  conversation: Conversation;
  onConversationUpdate: (conversation: Conversation) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  onConversationUpdate,
  isProcessing,
  setIsProcessing,
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isProcessing) return;

    const updatedConversation = addUserMessage(conversation, message);
    onConversationUpdate(updatedConversation);
    setMessage("");

    setIsProcessing(true);
    try {
      const conversationWithResponse = await getAssistantResponse(
        updatedConversation
      );
      onConversationUpdate(conversationWithResponse);
    } catch (error) {
      console.error("Error getting response:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4">
        <MessageList messages={conversation.messages} />
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-grow relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[48px] max-h-[120px]"
              rows={1}
              disabled={isProcessing}
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || isProcessing}
            className={`p-2 rounded-full ${
              !message.trim() || isProcessing
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[13px]`}
          >
            {isProcessing ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
