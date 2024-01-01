import { Box } from "@mui/material";
import { type PostItem as PostItemProps } from "../../store/posts-slice";

export default function PostItem({
  id,
  title,
  content,
  movie,
  topic,
  author,
  votes,
  created_at,
}: PostItemProps) {
  return <Box></Box>;
}
