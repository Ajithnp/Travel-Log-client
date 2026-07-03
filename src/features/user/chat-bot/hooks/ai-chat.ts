import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { sendMessageToBot, type ChatMessage} from '../services/api.services';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: 'Hi! 👋 I\'m your TravelLog travel assistant. Ask me about weekend trips across India, pricing, availability, or any travel tips!',
      timestamp: new Date(),
    },
  ]);

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessageToBot,
    onSuccess: (reply) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again! 🙏',
          timestamp: new Date(),
        },
      ]);
    },
  });

  const sendMessage = useCallback(
    (userInput: string) => {
      if (!userInput.trim() || isPending) return;

      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: userInput.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Last 10 messages send (context window)
      const chatHistory = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      mutate({
        message: userInput.trim(),
        chatHistory,
      });
    },
    [messages, isPending, mutate]
  );
  const clearChat = useCallback(() => {
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Hi! 👋 Chat cleared. How can I help you?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return { messages, sendMessage, isPending, clearChat };
}