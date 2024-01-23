import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  addAComment,
  selectCommentByPostId,
  type CommentItem as CommentItemType,
  selectCommentStatus,
  getCommentByPostId,
} from "../../store/comments-slice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { type PostItem as PostItemType } from "../../store/posts-slice.ts";
import {
  fetchUsers,
  selectAllUsers,
  selectUserListStatus,
} from "../../store/users-slice.ts";
import { UserItem } from "../../store/auth-slice.ts";
import CommentVote from "./CommentVote.tsx";

type CommentsProps = {
  item: PostItemType;
};

export default function Comments({ item }: CommentsProps) {
  // const comments: CommentItemType[] = item.comments;
  const comments: CommentItemType[] = useAppSelector(selectCommentByPostId);
  const commentStatus = useAppSelector(selectCommentStatus);
  const userListStatus = useAppSelector(selectUserListStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (commentStatus === "idle") {
      dispatch(getCommentByPostId(item.id));
    }
  }, [commentStatus, dispatch, item.id]);

  // use later when we have id route
  // const comments: CommentItemType[] = useAppSelector(
  //   (state) => state.comments.items
  // ).filter((c) => c.post_id === item.id);

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
        <Typography variant="subtitle1">Dan Dinh</Typography>
      </Stack>
      <CommentInput post={item} />
      <hr style={{ width: "100%", marginTop: "50px" }}></hr>
      <Stack direction="column" spacing={5}>
        {
          commentStatus === "loading" || userListStatus === "loading" ? (
            <CircularProgress />
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} post={item} item={comment} />
            ))
          )
          // comments.map(
          //   (comment) =>
          //     comment.response_id === undefined && (
          //       <CommentItem key={comment.id} post={item} item={comment} />
          //     )
          // )
        }
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
  const userListStatus = useAppSelector(selectUserListStatus) as string;
  const userList: UserItem[] = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userListStatus === "idle") {
      dispatch(fetchUsers());
      console.log("done");
    }
  }, [dispatch, userListStatus]);

  const commentAuthor: UserItem = userList.find(
    (user) => user.id === item.user_id
  );

  console.log("CommentItem");
  console.log("comment " + userListStatus);
  // const username = commentAuthor.username;
  // const replies = comments.filter((c) => c.response_id === item.id);

  function handleClick() {
    setIsReplying((prev) => !prev);
  }

  return (
    commentAuthor && (
      <Box
        sx={{ padding: "0 0 0 10px", borderLeft: 3, borderColor: "grey.400" }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Avatar sizes="small" />
          <Typography variant="body2">{commentAuthor.username}</Typography>
        </Stack>
        <Typography variant="body1">{item.content}</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <CommentVote commentItem={item} />
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
        {item.responses &&
          item.responses.map((reply) => (
            <CommentItem key={reply.id} post={post} item={reply} />
          ))}
      </Box>
    )
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
      response_id: item?.id,
      content: commentBody,
      responses: [],
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
