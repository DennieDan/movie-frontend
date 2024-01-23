import { Button, Stack, Typography } from "@mui/material";
import { CommentItem } from "../../store/comments-slice";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

type CommentVoteProps = {
  commentItem: CommentItem;
};

export default function CommentVote({ commentItem }: CommentVoteProps) {
  return (
    <Stack
      direction="row"
      spacing={0}
      justifyContent="center"
      alignItems="center"
    >
      <Button sx={{ color: "blue" }} disableElevation>
        <ArrowDropUpOutlinedIcon fontSize="small" />
      </Button>
      <Typography sx={{ color: "grey", fontSize: 15 }}>Vote</Typography>
      <Button sx={{ color: "blue" }} disableElevation>
        <ArrowDropDownOutlinedIcon fontSize="small" />
      </Button>
    </Stack>
  );
}
