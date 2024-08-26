# To run:

### `yarn install`

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Pitched requirements:

- Desktop only SPA
- Basic create react app and material UI for shell and styling
- Left rail conversation list
  - Ability to add conversations via an autocomplete with a predefined set of users
  - Can not create duplicate conversations via the autocomplete
  - Select and navigate conversations
  - Selected conversation is highlighted
  - Button to delete conversations
  - Preview latest message for existing conversations
  - Have at least one pre existing conversation to demo selected user's
    message history
  - ~~Selecting conversation always scrolls to latest history~~
  - Scrollable view
- Send message textarea
  - Ability to post as the active user to the selected
    conversation
  - ~~Posting scrolls to the bottom~~
  - Disabling text input if no conversation selected
  - Don't allow sending unless value is present
  - Enter to send
  - Send button / icon
  - Clears when message is posted
  - Clears when conversation changes
- Message history
  - empty state when nothing selected
  - ~~header of selected conversation at the top of the view~~
  - renders from bottom up with a scrollable view
  - displays message time posted and message data
  - logged in user messages on right, other user's messages on left

Out of scope:

- Responsive design
- Styling outside of basic grid layout and material-ui styles
- Faking server like events for message state ie sent, delivered, read
- Faking inbound in time messages that may have scroll considerations
- Faking loading states for data
- Posting files, videos, emojis
- Input validation
- URL updates and loading a selected conversation
- Group messages / channels
- New message indicators to mock new inbound messages
- Searching conversations
- Searching messages
- Keyboard navigation
- Accessibility outside of basic Material UI
- Date info dividers by day
- Virtualization
- Unit tests

Channels / groups can be easily added with this data structure. The conversation state would need to change to support 
private channels, public channels and group message formats. Conversation creation would need to be a bit more involved 
to accept channels with a name or a group of selected users.
