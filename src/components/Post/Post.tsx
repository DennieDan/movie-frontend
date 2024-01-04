import { Box, Stack, Typography } from "@mui/material";
import { type PostItem as PostItemType } from "../../store/posts-slice.ts";
import Vote from "../UI/Vote.tsx";
import MovieTab from "../UI/MovieTab.tsx";
import { formatCreateInterval } from "../../helpers/utils.ts";
import TopicChip from "../UI/TopicChip.tsx";
import Action from "./Action.tsx";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

type PostProps = {
  item: PostItemType;
};

export default function Post({ item }: PostProps) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "10px 10px",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          width="5%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="top"
        >
          <Vote item={item} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="top"
          justifyContent="space-evenly"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            flexGrow={10}
          >
            {item.movie && <MovieTab movie={item.movie} />}
            <Typography variant="subtitle2">
              Posted by {item.author} {formatCreateInterval(item)}
            </Typography>
          </Box>
          {/* <Box>
            <Typography variant="h4">{item.title}</Typography>
          </Box> */}
          {/* <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <TopicChip name={item.topic} color="success" />
          </Box> */}
          <Box display="block" alignItems="left" justifyContent="center">
            <Typography variant="h4">{item.title}</Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              {item.topic && <TopicChip name={item.topic} color="success" />}
            </Box>
            <Typography variant="body1">{item.content}</Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Action
              FirstIcon={BookmarkBorderOutlinedIcon}
              SecondIcon={BookmarkIcon}
              firstName="Save"
              secondName="Saved"
              tooltip="Unsave"
            />
            <Action
              FirstIcon={NotificationsOutlinedIcon}
              SecondIcon={NotificationsIcon}
              firstName="Follow"
              secondName="Following"
              tooltip="Unfollow"
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
