import { Box, MenuItem, SelectChangeEvent, Stack } from "@mui/material";
import { useState } from "react";
import { POSTS } from "../dummy-posts.ts";
import MyPagination from "../components/UI/MyPagination.tsx";
import SortDropDown from "../components/UI/SortDropDown.tsx";
import PostItem from "../components/UI/PostItem.tsx";

type SortByType = "start-date" | "movie" | "topic" | "most-votes";

export default function Homepage() {
  const [sortBy, setSortBy] = useState<SortByType>("start-date");

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortByType);
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Stack direction="column">
        <Box
          display="flex"
          flexDirection="row"
          sx={{ padding: "20px 20px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <MyPagination pages={5} />
          <SortDropDown onChange={handleChange} value={sortBy}>
            <MenuItem value="start-date">Start Date</MenuItem>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="topic">Topic</MenuItem>
            <MenuItem value="most-votes">Most Votes</MenuItem>
          </SortDropDown>
        </Box>
        <PostItem />
      </Stack>
    </Box>
  );
}
