import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MyPagination from "../components/UI/MyPagination.tsx";
import SortDropDown from "../components/UI/SortDropDown.tsx";
import PostItem from "../components/UI/PostItem.tsx";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import {
  sortPostListDisplay,
  type PostItem as PostItemType,
  selectDisplayPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../store/posts-slice.ts";

export default function Homepage() {
  const postList: PostItemType[] = useAppSelector(selectDisplayPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const postError = useAppSelector(getPostsError);

  // const postList: PostItemType[] = useAppSelector(() => selectDisplayPosts());
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<string>("start-date");

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    dispatch(sortPostListDisplay(event.target.value));
  };

  const postContent = (
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

        {postError ? (
          <Typography>Error: {postError}</Typography>
        ) : (
          // (
          //   <div>{postList[0].title}</div>
          // )
          postList?.length > 0 &&
          postList?.map((post) => (
            <>
              <PostItem key={post.id} item={post} />
              <Divider />
            </>
          ))
        )}
      </Stack>
    </Box>
  );

  const content =
    postStatus === "loading" ? (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    ) : (
      postContent
    );

  return content;
}
