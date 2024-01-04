import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  addAComment,
  type CommentItem as CommentItemType,
} from "../../store/comments-slice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { type PostItem as PostItemType } from "../../store/posts-slice.ts";

type CommentsProps = {
  item: PostItemType;
};

export default function Comments({ item }: CommentsProps) {
  // const comments: CommentItemType[] = useAppSelector(
  //   (state) => state.comments.items
  // );

  // use later when we have id route
  const comments: CommentItemType[] = useAppSelector(
    (state) => state.comments.items
  ).filter((c) => c.post_id === item.id);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="left"
      justifyContent="center"
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "10px 10px 10px 80px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={0.5}
      >
        <Typography variant="body1">Comment as</Typography>
        <Typography variant="subtitle1"> Dan Dinh</Typography>
      </Stack>
      <CommentInput post={item} />
      <hr style={{ width: "100%", marginTop: "50px" }}></hr>
      <Stack direction="column" spacing={5}>
        {comments.map(
          (comment) =>
            comment.reply_to === undefined && (
              <CommentItem key={comment.id} post={item} item={comment} />
            )
        )}
      </Stack>
    </Box>
  );
}

type CommentItemProps = {
  post: PostItemType;
  item: CommentItemType;
};

function CommentItem({ post, item }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const comments: CommentItemType[] = useAppSelector(
    (state) => state.comments.items
  );

  const replies = comments.filter((c) => c.reply_to === item.id);

  function handleClick() {
    setIsReplying((prev) => !prev);
  }

  return (
    <Box sx={{ padding: "0 0 0 10px", borderLeft: 3, borderColor: "grey.400" }}>
      <Typography variant="body1">{item.body}</Typography>
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Button
          id="profile-button"
          startIcon={<ChatBubbleOutlineIcon />}
          sx={{ color: "grey" }}
          disableElevation
          disableRipple
          onClick={handleClick}
        >
          Reply
        </Button>
      </Stack>
      {isReplying && (
        <CommentInput
          post={post}
          item={item}
          onReply={() => setIsReplying(false)}
        />
      )}
      {replies.map((reply) => (
        <CommentItem key={reply.id} post={post} item={reply} />
      ))}
    </Box>
  );
}

type PostCommentInputProps = {
  item?: never;
  post: PostItemType;
};

type ReplyInputProps = {
  post: PostItemType;
  item: CommentItemType;
  onReply: () => void;
};

type CommentInputProps = PostCommentInputProps | ReplyInputProps;

function isReplyInputProps(props): props is ReplyInputProps {
  return "item" in props;
}

// eslint-disable-next-line no-shadow-restricted-names
function CommentInput(props: CommentInputProps) {
  const [commentBody, setCommentBody] = useState<string>("");
  const dispatch = useAppDispatch();

  const { post, item } = props;
  function handleComment() {
    const newComment = {
      post_id: post.id,
      reply_to: item?.id,
      body: commentBody,
      comments: [],
    };
    dispatch(addAComment(newComment));
    setCommentBody("");
    if (isReplyInputProps(props)) {
      const { onReply } = props;
      onReply();
    }
  }

  return (
    <>
      <TextField
        fullWidth
        multiline
        placeholder="What are your thoughts"
        minRows={5}
        value={commentBody}
        onChange={(event) => setCommentBody(event.target.value)}
      />
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Button
          component="label"
          variant="contained"
          disableRipple
          sx={{
            mt: "10px",
            width: "150px",
            fontSize: 18,
            fontWeight: 700,
            borderRadius: "5px",
          }}
          onClick={handleComment}
        >
          Comment
        </Button>
      </Box>
    </>
  );
}
