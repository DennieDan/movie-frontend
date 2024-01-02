import {
  Box,
  Divider,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { POSTS } from "../dummy-posts.ts";
import MyPagination from "../components/UI/MyPagination.tsx";
import SortDropDown from "../components/UI/SortDropDown.tsx";
import PostItem from "../components/UI/PostItem.tsx";
import { type PostItem as PostItemType } from "../store/posts-slice.ts";

type SortByType = "start-date" | "movie" | "topic" | "most-votes";

const post_1: PostItemType = {
  id: 1,
  title:
    "Is Jaws worth watching 20 times?I was really shocked as I realised today was the twentieth time I have watched Jaws!I was really shocked as I realised today was the twentieth time I have watched Jaws!I was really shocked as I realised today was the twentieth time I have watched Jaws!I was really shocked as I realised today was the twentieth time I have watched Jaws!",
  content:
    "I was really shocked as I realised today was the twentieth time I have watched Jaws!",
  movie: "Jaws",
  topic: "review",
  author: "Jona-10",
  votes: 20,
  created_at: "2023-12-26T13:51:50.417-07:00",
};

export default function Homepage() {
  const [sortBy, setSortBy] = useState<SortByType>("start-date");

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortByType);
  };

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: "5px" }}>
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
        {POSTS.map((post) => (
          <>
            <PostItem key={post.id} item={post} />
            <Divider />
          </>
        ))}
        <PostItem item={post_1} />
      </Stack>
    </Box>
  );
}
