import { api } from './api';

export const chatService = {
  getMessages: async (roomId: string) => {
    // Get messages logic
  },
  sendMessage: async (roomId: string, message: string) => {
    // Send message logic
  },
  createRoom: async (participants: string[]) => {
    // Create room logic
  },
};