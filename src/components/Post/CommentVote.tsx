import { Button, Stack, Typography } from "@mui/material";
import {
  CommentItem,
  downvoteComment,
  upvoteComment,
} from "../../store/comments-slice.ts";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { UserItem, getAuthUser } from "../../store/auth-slice.ts";
import { useNavigate } from "react-router-dom";

type CommentVoteProps = {
  commentItem: CommentItem;
  votes: number;
};

export default function CommentVote({ commentItem, votes }: CommentVoteProps) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser) as UserItem;
  const navigate = useNavigate();

  async function handleUpvoteComment() {
    if (authUser) {
      await dispatch(
        upvoteComment({ user_id: authUser.id, comment_id: commentItem.id })
      );
    } else {
      navigate("/login");
    }
  }

  async function handleDownvoteComment() {
    if (authUser) {
      await dispatch(
        downvoteComment({ user_id: authUser.id, comment_id: commentItem.id })
      );
    } else {
      navigate("/login");
    }
  }

  return (
    <Stack
      direction="row"
      spacing={0}
      justifyContent="center"
      alignItems="center"
    >
      <Button
        sx={{ color: "blue" }}
        disableElevation
        onClick={handleUpvoteComment}
      >
        <ArrowDropUpOutlinedIcon fontSize="small" />
      </Button>
      <Typography sx={{ color: "grey", fontSize: 15 }}>{votes}</Typography>
      <Button
        sx={{ color: "blue" }}
        disableElevation
        onClick={handleDownvoteComment}
      >
        <ArrowDropDownOutlinedIcon fontSize="small" />
      </Button>
    </Stack>
  );
}
