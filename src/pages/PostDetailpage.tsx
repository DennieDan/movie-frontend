import { Stack } from "@mui/material";
import Post from "../components/Post/Post.tsx";
import Comments from "../components/Post/Comments.tsx";
import { type PostItem as PostItemType } from "../store/posts-slice.ts";
import { useAppSelector } from "../store/hooks.ts";
import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = params.id;
  const postList: PostItemType[] = useAppSelector((state) => state.posts.items);
  const item: PostItemType = postList.find(
    (post) => post.id === Number(postId)
  );
  return (
    <Stack direction="column" spacing={5}>
      <Post item={item} />
      <Comments item={item} />
    </Stack>
  );
}
