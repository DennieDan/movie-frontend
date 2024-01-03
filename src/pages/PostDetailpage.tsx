import { Stack } from "@mui/material";
import Post from "../components/Post/Post.tsx";
import Comments from "../components/Post/Comments.tsx";
import { type PostItem as PostItemType } from "../store/posts-slice.ts";

type PostDetailpageProps = {
  item: PostItemType;
};

export default function PostDetailpage({ item }: PostDetailpageProps) {
  return (
    <Stack direction="column" spacing={5}>
      <Post item={item} />
      <Comments />
    </Stack>
  );
}
