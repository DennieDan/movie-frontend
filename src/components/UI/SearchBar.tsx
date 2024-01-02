import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../store/hooks.ts";
import { searchPostListDisplay } from "../../store/posts-slice.ts";

const iconStyle: object = {
  cursor: "pointer",
};

const SearchBar: FunctionComponent = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setText(event.target.value);
  }

  function handleClick(): void {
    console.log("clicked the clear icon ...");
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    dispatch(searchPostListDisplay(text));
  }

  return (
    <FormControl fullWidth>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Search by categories or movies"
          variant="outlined"
          onChange={handleChange}
          onMouseLeave={handleSubmit}
          value={text}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <ClearIcon sx={iconStyle} />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </FormControl>
  );
};

export default SearchBar;
