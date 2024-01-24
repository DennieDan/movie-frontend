import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { END_POINT } from "../constants.ts";
import { get } from "../helpers/http.ts";

export type CommentItem = {
  id: number | undefined;
  user_id: number;
  post_id: number;
  response_id: number | undefined;
  content: string;
  responses: CommentItem[]; // delete later
  comment_votes: CommentVoteItem[];
};

type CommentsState = {
  items: CommentItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type RawCommentReturn = {
  id: number | undefined;
  user_id: number;
  post_id: number;
  ResponseID: number | undefined;
  content: string;
  Responses: CommentItem[]; // delete later
  comment_votes: CommentVoteItem[];
};

type CommentVoteItem = {
  UserID: number;
  CommentID: number;
  Score: number;
};

const initialState: CommentsState = {
  items: [],
  status: "idle",
  error: null,
};

type CreateCommentReturnType = {
  message?: string;
  comment?: CommentItem;
};

export const getCommentByPostId = createAsyncThunk(
  "comments/getCommentByPostId",
  async (post_id: number) => {
    const response = await get(`${END_POINT}/api/comments/${post_id}`);

    const data = (await response.json()) as RawCommentReturn[];

    const comments: CommentItem[] = data.map((rawComment) => {
      return {
        id: rawComment.id,
        user_id: rawComment.user_id,
        post_id: rawComment.post_id,
        response_id: rawComment.ResponseID,
        content: rawComment.content,
        responses: rawComment.Responses,
        comment_votes: rawComment.comment_votes,
      };
    });

    console.log("fetching comment");
    console.log(comments);
    return comments;
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (body: {
    user_id: number;
    post_id: number;
    response_id: number | null;
    body: string;
  }) => {
    const response = await fetch(`${END_POINT}/api/create_comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as CreateCommentReturnType;
    return data;
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async (body: { comment_id: number; body: string }) => {
    const response = await fetch(
      `${END_POINT}/api/edit_comment/${body.comment_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: body.body }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (comment_id: number) => {
    const response = await fetch(
      `${END_POINT}/api/delete_comment/${comment_id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    return data;
  }
);

export const upvoteComment = createAsyncThunk(
  "comments/upvoteComment",
  async (body: { user_id: number; comment_id: number }) => {
    const response = await fetch(
      `${END_POINT}/api/upvote_comment/${body.user_id}/${body.comment_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as { message: string };
    console.log(data);
    return data;
  }
);

export const downvoteComment = createAsyncThunk(
  "comments/downvoteComment",
  async (body: { user_id: number; comment_id: number }) => {
    const response = await fetch(
      `${END_POINT}/api/downvote_comment/${body.user_id}/${body.comment_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as { message: string };
    console.log(data);
    return data;
  }
);

export const selectCommentStatus = (state) => state.comments.status;
export const selectCommentByPostId = (state) => state.comments.items;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCommentByPostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentByPostId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getCommentByPostId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(upvoteComment.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(downvoteComment.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(editComment.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

// export const {} = commentsSlice.actions;
