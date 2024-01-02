import { IconButton, Stack, Typography } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import {
  upVote,
  type PostItem as PostItemType,
  downVote,
} from "../../store/posts-slice";
import { useAppDispatch } from "../../store/hooks";

type VoteProps = {
  item: PostItemType;
};

export default function Vote({ item }: VoteProps) {
  const dispatch = useAppDispatch();

  function handleUpVote() {
    dispatch(upVote(item));
  }

  function handleDownVote() {
    dispatch(downVote(item));
  }

  return (
    <Stack width="8%" direction="column" display="flex" alignItems="center">
      <IconButton
        sx={{ borderRadius: "10px", padding: "0.125px" }}
        onClick={handleUpVote}
      >
        <ArrowDropUpRoundedIcon sx={{ fontSize: 70 }} />
      </IconButton>
      <Typography>{item.votes}</Typography>
      <IconButton
        sx={{ borderRadius: "10px", padding: "0.125px" }}
        onClick={handleDownVote}
      >
        <ArrowDropDownRoundedIcon sx={{ fontSize: 70 }} />
      </IconButton>
    </Stack>
  );
}
