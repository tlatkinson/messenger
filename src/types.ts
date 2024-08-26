export type User = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  userId: number;
  message: string;
  timeSent: Date;
};

export type Conversation = {
  id: number;
  userId: number;
  messageIds: number[];
};

export type Messenger = {
  selectedConversationId: number | null;
  conversations: Map<number, Conversation>;
  messages: Map<number, Message>;
};
