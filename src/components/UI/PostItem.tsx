import { Avatar, Box, ListItemButton, Stack, Typography } from "@mui/material";
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
    <Stack direction="row">
      <Vote item={item} />
      <ListItemButton href={`posts/${item.id}`}>
        <Box
          width="60%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="left"
          sx={{ padding: "18px 0px 0px 0px" }}
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              variant="h6"
              textAlign="left"
              sx={{ fontWeight: "600" }}
            >
              {item.title}
              {item.topic && (
                <TopicChip
                  name={item.topic.title}
                  color={
                    item.topic.color as
                      | "error"
                      | "default"
                      | "primary"
                      | "secondary"
                      | "success"
                      | "info"
                      | "warning"
                  }
                />
              )}
            </Typography>
          </Box>
          <Box>
            {item.movie.id !== 0 && (
              <MovieTab movie={`${item.movie.title} ${item.movie.year}`} />
            )}
          </Box>
        </Box>
        <Box
          width="30%"
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box>{item.comments.length} comments</Box>
          <Box display="flex" flexDirection="row">
            <Avatar />
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" textAlign="left">
                {item.author.username}
              </Typography>
              <Typography variant="caption" textAlign="left">
                {formatCreateInterval(item)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </ListItemButton>
    </Stack>
  );
}
