import { useCallback, useMemo, useReducer } from "react";
import { initialData, messengerReducer } from "./messengerReducer";
import { Messenger, User } from "./types";

export default function useMessenger(): {
  messenger: Messenger;
  onSelectUser: (user: User) => void;
  onDeleteConversation: (conversationId: number) => void;
  onSelectConversation: (conversationId: number | null) => void;
  onSendMessage: (message: string) => void;
} {
  const [messenger, dispatch] = useReducer(messengerReducer, initialData);

  const onSelectUser = useCallback((user: User) => {
    dispatch({
      type: "addConversation",
      payload: {
        //simplifying id structure for this by duping user id
        id: user.id,
        userId: user.id,
        messageIds: [],
      },
    });
  }, []);

  const onDeleteConversation = useCallback((conversationId: number) => {
    dispatch({
      type: "deleteConversation",
      payload: {
        conversationId,
      },
    });
  }, []);

  const onSendMessage = useCallback(
    (message: string) => {
      if (messenger.selectedConversationId && message) {
        dispatch({
          type: "addMessage",
          payload: {
            conversationId: messenger.selectedConversationId,
            message,
          },
        });
      }
    },
    [messenger.selectedConversationId],
  );

  const onSelectConversation = useCallback((conversationId: number | null) => {
    dispatch({
      type: "selectConversation",
      payload: {
        conversationId,
      },
    });
  }, []);

  return useMemo(
    () => ({
      messenger,
      onSelectUser,
      onDeleteConversation,
      onSelectConversation,
      onSendMessage,
    }),
    [
      messenger,
      onSelectUser,
      onDeleteConversation,
      onSelectConversation,
      onSendMessage,
    ],
  );
}
