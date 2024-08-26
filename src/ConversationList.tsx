import React from "react";
import { List } from "@mui/material";
import { ConversationListItem } from "./ConversationListItem";
import { createStyles, makeStyles } from "@mui/styles";
import { Conversation, Message } from "./types";

interface Props {
  selectedConversationId: number | null;
  conversations: Map<number, Conversation>;
  messages: Map<number, Message>;
  onSelect: (conversationId: number) => void;
  onDelete: (conversationId: number) => void;
}

const useStyles = makeStyles(
  createStyles({
    conversationList: {
      overflow: "auto",
    },
  }),
);

export default function ConversationList({
  selectedConversationId,
  conversations,
  messages,
  onSelect,
  onDelete,
}: Props) {
  const styles = useStyles();

  //could be some more date detail here to delineate between days
  return (
    <List className={styles.conversationList}>
      {Array.from(conversations.values()).map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          isSelected={selectedConversationId === conversation.id}
          latestMessage={messages.get(conversation.messageIds?.[0])}
          onSelect={onSelect}
          onDelete={onDelete}
          conversation={conversation}
        />
      ))}
    </List>
  );
}
