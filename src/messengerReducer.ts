import {
  initialConversations,
  initialMessages,
  LOGGED_IN_USER_ID,
} from "./data";
import { Conversation, Messenger } from "./types";

export const initialData: Messenger = {
  selectedConversationId: 1,
  conversations: initialConversations,
  messages: initialMessages,
};

type AddConversationAction = { type: "addConversation"; payload: Conversation };
type DeleteConversationAction = {
  type: "deleteConversation";
  payload: { conversationId: number };
};
type SelectConversationAction = {
  type: "selectConversation";
  payload: { conversationId: number | null };
};
type AddMessageAction = {
  type: "addMessage";
  payload: { conversationId: number; message: string };
};
export type Actions =
  | AddConversationAction
  | DeleteConversationAction
  | SelectConversationAction
  | AddMessageAction;

export const messengerReducer = (
  state: Messenger,
  action: Actions,
): Messenger => {
  switch (action.type) {
    case "addConversation": {
      const conversations = new Map(state.conversations);
      conversations.set(action.payload.id, action.payload);
      return {
        ...state,
        conversations,
        selectedConversationId: action.payload.id,
      };
    }
    case "deleteConversation": {
      const conversation = state.conversations.get(
        action.payload.conversationId,
      );

      if (!conversation) {
        return state;
      }

      const messages = new Map(state.messages);

      conversation.messageIds.forEach((messageId) => {
        messages.delete(messageId);
      });

      const conversations = new Map(state.conversations);
      conversations.delete(action.payload.conversationId);

      return {
        ...state,
        conversations,
        messages,
      };
    }
    case "selectConversation": {
      return {
        ...state,
        selectedConversationId: action.payload.conversationId,
      };
    }
    case "addMessage": {
      const conversations = new Map(state.conversations);
      const conversation = conversations.get(action.payload.conversationId);

      if (!conversation) {
        return state;
      }

      const messages = new Map(state.messages);

      const id = messages.size + 1;
      messages.set(id, {
        id,
        userId: LOGGED_IN_USER_ID,
        message: action.payload.message,
        timeSent: new Date(),
      });

      conversations.set(action.payload.conversationId, {
        ...conversation,
        messageIds: [id, ...conversation?.messageIds],
      });

      return {
        ...state,
        conversations,
        messages,
      };
    }
    default:
      return state;
  }
};
