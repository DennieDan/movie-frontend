import { IconButton, Stack, Typography } from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import {
  type PostItem as PostItemType,
  upvotePost,
  downvotePost,
} from "../../store/posts-slice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserItem, getAuthUser } from "../../store/auth-slice.ts";
import { useNavigate } from "react-router-dom";

type VoteProps = {
  item: PostItemType;
};

export default function Vote({ item }: VoteProps) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser) as UserItem;
  const navigate = useNavigate();

  async function handleUpVote() {
    if (authUser) {
      await dispatch(upvotePost({ author_id: authUser.id, post_id: item.id }));
    } else {
      navigate("/login");
    }
  }

  async function handleDownVote() {
    if (authUser) {
      await dispatch(
        downvotePost({ author_id: authUser.id, post_id: item.id })
      );
    } else {
      navigate("/login");
    }
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
