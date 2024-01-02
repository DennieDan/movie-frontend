import {
  Avatar,
  Box,
  ListItemButton,
  ListItemProps,
  Typography,
} from "@mui/material";
import { type PostItem as PostItemType } from "../../store/posts-slice";
import Vote from "./Vote.tsx";
import TopicChip from "./TopicChip.tsx";
import MovieTab from "./MovieTab.tsx";
import {
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_MONTH,
  ONE_WEEK,
  ONE_YEAR,
} from "../../constants.ts";

type PostItemProps = {
  item: PostItemType;
} & ListItemProps;

export default function PostItem({ item }: PostItemProps) {
  function formatCreateInterval(): string {
    const inMiliSecond = new Date().getTime() - Date.parse(item.created_at);
    let res: string;
    let interval: number;
    if (inMiliSecond > ONE_YEAR) {
      interval = Math.ceil(inMiliSecond / ONE_YEAR);
      res = interval.toString() + " year";
    } else if (inMiliSecond > ONE_MONTH) {
      interval = Math.ceil(inMiliSecond / ONE_MONTH);
      res = interval.toString() + " month";
    } else if (inMiliSecond > ONE_WEEK) {
      interval = Math.ceil(inMiliSecond / ONE_WEEK);
      res = interval.toString() + " week";
    } else if (inMiliSecond > ONE_DAY) {
      interval = Math.ceil(inMiliSecond / ONE_DAY);
      res = interval.toString() + " day";
    } else if (inMiliSecond > ONE_HOUR) {
      interval = Math.ceil(inMiliSecond / ONE_HOUR);
      res = interval.toString() + " hour";
    } else if (inMiliSecond > ONE_MINUTE) {
      interval = Math.ceil(inMiliSecond / ONE_MINUTE);
      res = interval.toString() + " minute";
    } else {
      interval = 0;
      res = "";
    }

    return res !== ""
      ? interval > 1
        ? res + "s ago"
        : res + " ago"
      : "Just now";
  }
  return (
    <ListItemButton>
      <Vote value={item.votes} />
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
            {item.topic && <TopicChip name={item.topic} color="info" />}
          </Typography>
        </Box>
        {item.movie && <MovieTab movie={item.movie} />}
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
              {formatCreateInterval()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ListItemButton>
  );
}
