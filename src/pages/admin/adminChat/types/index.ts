export type ChatMessage =
  | { from: "user" | "admin"; text: string; time: Date }
  | { from: "user" | "admin"; audio: string; time: Date }
  | { from: "user" | "admin"; image: string; time: Date };

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
};
