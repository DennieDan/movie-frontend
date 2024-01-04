import { Avatar, Box, ListItemButton, Typography } from "@mui/material";
import { type PostItem as PostItemType } from "../../store/posts-slice";
import Vote from "./Vote.tsx";
import TopicChip from "./TopicChip.tsx";
import MovieTab from "./MovieTab.tsx";
import { formatCreateInterval } from "../../helpers/utils.ts";

type PostItemProps = {
  item: PostItemType;
};

export default function PostItem({ item }: PostItemProps) {
  return (
    <ListItemButton href={`posts/${item.id}`}>
      <Vote item={item} />
      <Box
        width="60%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="left"
        sx={{ padding: "18px 0px 0px 0px" }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h6" textAlign="left" sx={{ fontWeight: "600" }}>
            {item.title}
            {item.topic && <TopicChip name={item.topic} color="error" />}
          </Typography>
        </Box>
        <Box>{item.movie && <MovieTab movie={item.movie} />}</Box>
      </Box>
      <Box
        width="30%"
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box>{10} comments</Box>
        <Box display="flex" flexDirection="row">
          <Avatar />
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" textAlign="left">
              {item.author}
            </Typography>
            <Typography variant="caption" textAlign="left">
              {formatCreateInterval(item)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ListItemButton>
  );
}
