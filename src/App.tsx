import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { users } from "./data";
import ConversationList from "./ConversationList";
import { UserSearch } from "./UserSearch";
import "./App.css";
import { MessageHistory } from "./MessageHistory";
import useMessenger from "./useMessenger";
import { Message } from "./types";

const useStyles = makeStyles(
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },
    leftRail: {
      padding: "8px",
      minWidth: "300px",
      maxWidth: "300px",
      borderRight: "1px solid",
      overflow: "hidden",
      height: "100%",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    right: {
      padding: "0 8px",
      flexGrow: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    input: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "0 0 8px",
    },
  }),
);

export default function App() {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const {
    messenger,
    onSelectUser,
    onDeleteConversation,
    onSelectConversation,
    onSendMessage,
  } = useMessenger();
  const { selectedConversationId, conversations, messages } = messenger;

  useEffect(() => {
    //clearing selected conversation if it was deleted
    if (selectedConversationId && !conversations.has(selectedConversationId)) {
      onSelectConversation(null);
      setMessage("");
    }
  }, [conversations, selectedConversationId, onSelectConversation]);

  //ideally handled by server so not doing an includes in a loop
  const filteredUsers = useMemo(() => {
    const userIds = Array.from(conversations.values()).map((c) => c.userId);

    return users.filter((u) => !userIds.includes(u.id));
  }, [conversations]);

  const conversationMessages: Message[] = useMemo(() => {
    if (!selectedConversationId) {
      return [];
    }

    return (
      conversations
        .get(selectedConversationId)
        ?.messageIds?.map((messageId) => messages.get(messageId))
        ?.filter((message): message is Message => !!message) ?? []
    );
  }, [selectedConversationId, conversations, messages]);

  const onChangeConversation = useCallback(
    (conversationId: number) => {
      onSelectConversation(conversationId);
      setMessage("");
    },
    [onSelectConversation],
  );

  function sendMessage() {
    onSendMessage(message);
    setMessage("");
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.leftRail}>
        <UserSearch onSelect={onSelectUser} users={filteredUsers} />
        <ConversationList
          selectedConversationId={selectedConversationId}
          conversations={conversations}
          messages={messages}
          onSelect={onChangeConversation}
          onDelete={onDeleteConversation}
        />
      </Box>
      <Box className={styles.right}>
        <MessageHistory messages={conversationMessages} />
        <Box className={styles.input}>
          <TextField
            disabled={!selectedConversationId}
            fullWidth
            variant="outlined"
            label="Send message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
            value={message}
          />
          <Button
            disabled={!message || !selectedConversationId}
            onClick={() => sendMessage()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
