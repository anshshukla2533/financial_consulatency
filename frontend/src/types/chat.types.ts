export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'file' | 'image';
  timestamp: Date;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
}