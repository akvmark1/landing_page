import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatbot = create<ChatbotState>((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  
  addMessage: (role, content) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: crypto.randomUUID(),
        role,
        content,
        timestamp: new Date(),
      },
    ],
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  clearMessages: () => set({ messages: [] }),
}));
