import { Conversation, Message } from "../types";
import { getChatResponse, getInitialMessage } from "./mockApi";
import { v4 as uuidv4 } from "uuid";

export const initializeConversation = (): Conversation => {
  return {
    id: uuidv4(),
    messages: [getInitialMessage()],
  };
};

export const addUserMessage = (
  conversation: Conversation,
  content: string
): Conversation => {
  const updatedConversation = {
    ...conversation,
    messages: [
      ...conversation.messages,
      {
        id: uuidv4(),
        role: "user",
        content,
        timestamp: new Date(),
      },
    ],
  };

  return updatedConversation;
};

// Get a response from the assistant
export const getAssistantResponse = async (
  conversation: Conversation
): Promise<Conversation> => {
  const response = await getChatResponse(conversation.messages);

  return {
    ...conversation,
    messages: [...conversation.messages, response],
  };
};
