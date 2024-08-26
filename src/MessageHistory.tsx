import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { LOGGED_IN_USER_ID } from "./data";
import { Message } from "./types";

const useStyles = makeStyles(
  createStyles({
    messageHistory: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column-reverse",
      gap: "8px",
      overflow: "auto",
    },
    message: {
      maxWidth: "60%",
      display: "flex",
      flexDirection: "column",
    },
    messageCopy: {
      padding: "8px",
      borderRadius: "8px",
      margin: "8px 0",
    },
    left: {
      alignSelf: "flex-start",
      //material ui override for speed
      alignItems: "flex-start !important",

      "& > $messageCopy": {
        background: "lightblue",
      },
    },
    right: {
      alignSelf: "flex-end",
      alignItems: "flex-end !important",

      "& > $messageCopy": {
        background: "lightgrey",
      },
    },
  }),
);

interface Props {
  messages: Message[];
}

export const MessageHistory = React.memo(function MessageHistory({
  messages,
}: Props) {
  const styles = useStyles();

  return (
    <List className={styles.messageHistory}>
      {messages.map((message) => (
        <ListItem
          key={message.id}
          className={`${styles.message} ${message.userId === LOGGED_IN_USER_ID ? styles.right : styles.left}`}
        >
          <Box className={styles.messageCopy}>{message.message}</Box>
          <Box>{message.timeSent.toISOString()}</Box>
        </ListItem>
      ))}
    </List>
  );
});
