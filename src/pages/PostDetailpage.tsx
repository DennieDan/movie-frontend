import { Stack } from "@mui/material";
import Post from "../components/Post/Post.tsx";
// import Comments from "../components/Post/Comments.tsx";
import {
  selectPostById,
  type PostItem as PostItemType,
  selectDisplayPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../store/posts-slice.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = params.id;

  const postList: PostItemType[] = useAppSelector(selectDisplayPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const postError = useAppSelector(getPostsError);

  const dispatch = useAppDispatch;

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const item: PostItemType = useAppSelector((state) =>
    selectPostById(state, postId)
  );
  console.log(postId);
  console.log(item);
  console.log(postList);
  return (
    <Stack direction="column" spacing={5}>
      hi
      {/* <Post item={item} /> */}
      {/* <Comments item={item} /> */}
    </Stack>
  );
}
