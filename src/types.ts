export type Platform = "ios" | "android" | "desktop";

export type MessageType = "text" | "image" | "voice" | "unknown";

export interface Contact {
  id: string;
  displayName: string;
}

export interface MediaRef {
  kind: "image" | "voice";
  path: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: "self" | "peer" | "system";
  timestamp: number;
  type: MessageType;
  content: string;
  media?: MediaRef;
}

export interface Conversation {
  id: string;
  displayName: string;
}

export interface ExportBundle {
  platform: Platform;
  sourcePath: string;
  conversations: Conversation[];
  contacts: Contact[];
  messages: Message[];
  generatedAt: string;
}

export interface AiSummary {
  summary: string;
  emotion: string;
  story: string;
}

export interface WebsiteInput {
  bundle: ExportBundle;
  ai?: AiSummary;
  theme: "classic" | "warm";
}
