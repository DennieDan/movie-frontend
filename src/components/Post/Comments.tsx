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
  selectCommentByPostId,
  type CommentItem as CommentItemType,
  selectCommentStatus,
  getCommentByPostId,
  createComment,
  editComment,
  deleteComment,
} from "../../store/comments-slice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { type PostItem as PostItemType } from "../../store/posts-slice.ts";
import {
  fetchUsers,
  selectAllUsers,
  selectUserListStatus,
} from "../../store/users-slice.ts";
import {
  UserItem,
  getAuthUser,
  getUserStatus,
  validateUser,
} from "../../store/auth-slice.ts";
import CommentVote from "./CommentVote.tsx";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

type CommentsProps = {
  item: PostItemType;
};

export default function Comments({ item }: CommentsProps) {
  // const comments: CommentItemType[] = item.comments;
  const comments: CommentItemType[] = useAppSelector(selectCommentByPostId);
  const commentStatus = useAppSelector(selectCommentStatus);
  const userListStatus = useAppSelector(selectUserListStatus);
  const authUser = useAppSelector(getAuthUser) as UserItem;
  const authStatus = useAppSelector(getUserStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (commentStatus === "idle") {
      dispatch(getCommentByPostId(item.id));
    }
    if (authStatus === "idle") {
      dispatch(validateUser);
    }
  }, [commentStatus, dispatch, item.id, authStatus]);

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
      {authUser ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={0.5}
          >
            <Typography variant="body1">Comment as</Typography>
            <Typography variant="subtitle1">{authUser.username}</Typography>
          </Stack>
          <CommentInput post={item} />
        </>
      ) : (
        <Box display="flex" justifyContent="flex-start">
          <Button variant="outlined" href="/login">
            Add a comment
          </Button>
        </Box>
      )}

      <hr style={{ width: "100%", marginTop: "50px" }}></hr>
      <Stack direction="column" spacing={5}>
        {commentStatus === "loading" || userListStatus === "loading" ? (
          <CircularProgress />
        ) : (
          //   comments.map((comment) => (
          //     <CommentItem key={comment.id} post={item} item={comment} />
          //   ))
          // )
          comments.map(
            (comment) =>
              comment.response_id === null && (
                <CommentItem key={comment.id} post={item} item={comment} />
              )
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const userListStatus = useAppSelector(selectUserListStatus) as string;
  const userList: UserItem[] = useAppSelector(selectAllUsers);
  const comments: CommentItemType[] = useAppSelector(selectCommentByPostId);
  const commentStatus = useAppSelector(selectCommentStatus);
  const authUser = useAppSelector(getAuthUser) as UserItem;
  const authStatus = useAppSelector(getUserStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userListStatus === "idle") {
      dispatch(fetchUsers());
      console.log("done");
    }
    if (commentStatus === "idle") {
      dispatch(getCommentByPostId(post.id));
      console.log("done");
    }
    if (authStatus === "idle") {
      dispatch(validateUser());
      console.log("done");
    }
  }, [dispatch, userListStatus, commentStatus, post.id, authStatus]);

  const commentAuthor: UserItem = userList.find(
    (user) => user.id === item.user_id
  );

  console.log("CommentItem");
  console.log("comment " + userListStatus);
  // const username = commentAuthor.username;
  const replies = comments.filter((c) => c.response_id === item.id);

  const votes = item.comment_votes.reduce((acc, b) => acc + b.Score, 0);
  console.log(item.comment_votes[0]);

  function handleClick() {
    if (authUser) {
      setIsReplying((prev) => !prev);
    } else {
      navigate("/login");
    }
  }

  function handleClickEdit() {
    setIsEditing(true);
    setIsReplying(false);
  }

  function handleCloseEdit() {
    setIsEditing(false);
  }

  return (
    commentAuthor &&
    authUser && (
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
        {isEditing ? (
          <CommentInput comment={item} onClose={handleCloseEdit} />
        ) : (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <CommentVote commentItem={item} votes={votes} />
            <Button
              id="reply-button"
              startIcon={<ChatBubbleOutlineIcon />}
              sx={{ color: "grey" }}
              disableElevation
              disableRipple
              onClick={handleClick}
            >
              Reply
            </Button>
            {authUser.id === item.user_id && (
              <Button
                id="edit-button"
                startIcon={<ModeEditOutlineOutlinedIcon />}
                sx={{ color: "grey" }}
                disableElevation
                disableRipple
                onClick={handleClickEdit}
              >
                Edit
              </Button>
            )}
          </Stack>
        )}

        {isReplying && (
          <CommentInput
            post={post}
            item={item}
            onReply={() => setIsReplying(false)}
          />
        )}
        {replies &&
          replies.map((reply) => (
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

type EditInputProps = {
  item?: never;
  post?: never;
  comment: CommentItemType;
  onClose: () => void;
};

type CommentInputProps =
  | PostCommentInputProps
  | ReplyInputProps
  | EditInputProps;

function isReplyInputProps(props): props is ReplyInputProps {
  return "item" in props;
}

function isEditInputProps(props): props is EditInputProps {
  return "comment" in props;
}

// eslint-disable-next-line no-shadow-restricted-names
function CommentInput(props: CommentInputProps) {
  const [commentBody, setCommentBody] = useState<string>(
    isEditInputProps(props) ? props.comment.content : ""
  );
  const authUser = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const { post, item } = props;
  function handleComment() {
    const newComment: {
      user_id: number;
      post_id: number;
      response_id: number | null;
      body: string;
    } = {
      user_id: authUser.id,
      post_id: post.id,
      response_id: item?.id,
      body: commentBody,
    };
    dispatch(createComment(newComment));
    setCommentBody("");
    if (isReplyInputProps(props)) {
      const { onReply } = props;
      onReply();
    }
  }

  function handleCancel() {
    if (isEditInputProps(props)) {
      const { onClose } = props;
      onClose();
    }
  }

  function handleEditComment() {
    if (isEditInputProps(props)) {
      const { comment } = props;
      dispatch(editComment({ comment_id: comment.id, body: commentBody }));
    }
  }

  function handleDeleteComment() {
    if (isEditInputProps(props)) {
      const { comment } = props;
      confirm({
        description:
          "This will permanently delete your comment and its responses.",
      }).then(() => dispatch(deleteComment(comment.id)));
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
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={3}
        sx={{ marginTop: 2 }}
      >
        {!isEditInputProps(props) ? (
          <Button
            component="label"
            variant="contained"
            disabled={commentBody === ""}
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
        ) : (
          <>
            <Button
              component="label"
              variant="contained"
              disabled={commentBody === ""}
              disableRipple
              sx={{
                mt: "10px",
                fontSize: 18,
                fontWeight: 700,
                borderRadius: "5px",
                color: "white",
                backgroundColor: "red",
              }}
              onClick={handleDeleteComment}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
            <Button
              component="label"
              variant="contained"
              disabled={commentBody === ""}
              disableRipple
              sx={{
                mt: "10px",
                width: "150px",
                fontSize: 18,
                fontWeight: 700,
                borderRadius: "5px",
                color: "white",
                backgroundColor: "grey",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              component="label"
              variant="contained"
              disabled={commentBody === ""}
              disableRipple
              sx={{
                mt: "10px",
                width: "150px",
                fontSize: 18,
                fontWeight: 700,
                borderRadius: "5px",
              }}
              onClick={handleEditComment}
            >
              Done
            </Button>
          </>
        )}
      </Stack>
    </>
  );
}
