import React from "react";
import { Box, Button, ListItem, Typography } from "@mui/material";
import { userMap } from "./data";
import { createStyles, makeStyles } from "@mui/styles";
import { Conversation, Message } from "./types";

const useStyles = makeStyles(
  createStyles({
    conversation: {
      borderBottom: "1px solid",
      display: "flex",
      //material ui override for speed
      justifyContent: "space-between !important",
      height: "60px",
      alignItems: "center",
    },
    selected: {
      background: "grey",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    latestMessage: {
      textOverflow: "ellipsis",
      textWrap: "nowrap",
      maxWidth: "190px",
      overflow: "hidden",
    },
  }),
);

interface Props {
  isSelected: boolean;
  conversation: Conversation;
  latestMessage: Message | undefined;
  onSelect: (conversationId: number) => void;
  onDelete: (conversationId: number) => void;
}

export const ConversationListItem = React.memo(function ConversationListItem({
  isSelected,
  conversation,
  onSelect,
  onDelete,
  latestMessage,
}: Props) {
  const styles = useStyles();

  return (
    <ListItem
      onClick={() => onSelect(conversation.id)}
      className={`${styles.conversation} ${isSelected && styles.selected}`}
      button
      selected={isSelected}
    >
      <Box className={styles.content}>
        <Typography component="div">
          {userMap.get(conversation.userId)?.name}
        </Typography>
        {latestMessage && (
          <Typography className={styles.latestMessage} variant="caption">
            {latestMessage.message}
          </Typography>
        )}
      </Box>
      {/*would be a delete/trash icon but import/package issues not worth figuring out*/}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(conversation.id);
        }}
      >
        Delete
      </Button>
    </ListItem>
  );
});
