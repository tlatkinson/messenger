import { Conversation, Message, User } from "./types";

export const LOGGED_IN_USER_ID = -1;

//ids start at 1 for truthy eval
export const initialMessages = new Map<number, Message>([
  [
    1,
    {
      id: 1,
      userId: LOGGED_IN_USER_ID,
      message: "hello world",
      timeSent: new Date("2024-08-24T04:00:00Z"),
    },
  ],
  [
    2,
    {
      id: 2,
      userId: 1,
      message:
        "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. ",
      timeSent: new Date("2024-08-24T04:05:00Z"),
    },
  ],
]);

export const initialConversations = new Map<number, Conversation>([
  [1, { id: 1, userId: 1, messageIds: [2, 1] }],
  [2, { id: 2, userId: 2, messageIds: [] }],
  [3, { id: 3, userId: 3, messageIds: [] }],
  [4, { id: 4, userId: 4, messageIds: [] }],
  [5, { id: 5, userId: 5, messageIds: [] }],
]);

export const userMap = new Map<number, User>([
  [1, { id: 1, name: "Alice" }],
  [2, { id: 2, name: "Bob" }],
  [3, { id: 3, name: "Charlie" }],
  [4, { id: 4, name: "Diana" }],
  [5, { id: 5, name: "Edward" }],
  [6, { id: 6, name: "Fiona" }],
  [7, { id: 7, name: "George" }],
  [8, { id: 8, name: "Hannah" }],
  [9, { id: 9, name: "Ian" }],
  [10, { id: 10, name: "Jessica" }],
  [11, { id: 11, name: "Kevin" }],
  [12, { id: 12, name: "Laura" }],
  [13, { id: 13, name: "Michael" }],
  [14, { id: 14, name: "Nina" }],
  [15, { id: 15, name: "Oliver" }],
  [16, { id: 16, name: "Patricia" }],
  [17, { id: 17, name: "Quincy" }],
  [18, { id: 18, name: "Rachel" }],
  [19, { id: 19, name: "Steven" }],
  [20, { id: 20, name: "Tina" }],
]);

export const users = Array.from(userMap.values());
