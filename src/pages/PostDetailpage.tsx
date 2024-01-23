import { Stack } from "@mui/material";
import Post from "../components/Post/Post.tsx";
// import Comments from "../components/Post/Comments.tsx";
import {
  type PostItem as PostItemType,
  getPostsStatus,
  fetchPosts,
  getAllPosts,
} from "../store/posts-slice.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Comments from "../components/Post/Comments.tsx";

export default function PostDetailPage() {
  const postList: PostItemType[] = useAppSelector(getAllPosts);
  console.log(postList);
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);

  const postStatus = useAppSelector(getPostsStatus);
  console.log(postStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const item: PostItemType = postList.find((post) => post.id === postId);
  // const item: PostItemType = useAppSelector((state) =>
  //   state.posts.posts.find((post) => post.id === postId)
  // );

  return (
    <Stack direction="column" spacing={5} width="100%">
      {item && (
        <>
          <Post item={item} />
          <Comments item={item} />
        </>
      )}
    </Stack>
  );
}
