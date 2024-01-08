import { Stack } from "@mui/material";
import Post from "../components/Post/Post.tsx";
// import Comments from "../components/Post/Comments.tsx";
import {
  type PostItem as PostItemType,
  getPostsStatus,
  fetchPosts,
} from "../store/posts-slice.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);

  const postStatus = useAppSelector(getPostsStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const item: PostItemType = useAppSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  console.log(item);
  return (
    <Stack direction="column" spacing={5}>
      <Post item={item} />
      {/* <Comments item={item} /> */}
    </Stack>
  );
}
