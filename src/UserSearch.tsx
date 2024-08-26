import React, { useState } from "react";
import { Autocomplete, ListItem, TextField } from "@mui/material";
import { User } from "./types";

interface Props {
  onSelect: (user: User) => void;
  users: User[];
}

export const UserSearch = React.memo(function UserSearch({
  onSelect,
  users,
}: Props) {
  const [search, setSearch] = useState("");

  //could enhance this by filtering out users with conversations already
  return (
    <Autocomplete<User>
      value={null}
      inputValue={search}
      options={users}
      getOptionLabel={(user) => user.name}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Create conversation" />
      )}
      onInputChange={(event, newInputValue) => {
        setSearch(newInputValue);
      }}
      renderOption={(liProps, user) => (
        <ListItem {...liProps} key={user.id}>
          {user.name}
        </ListItem>
      )}
      onChange={(event, user) => {
        setSearch("");

        if (user) {
          onSelect(user);
        }
      }}
    />
  );
});
