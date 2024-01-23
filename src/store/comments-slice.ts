import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { END_POINT } from "../constants.ts";
import { get } from "../helpers/http.ts";

let currentId: number = 9;

export type CommentItem = {
  id: number | undefined;
  user_id: number;
  post_id: number;
  response_id: number | undefined;
  content: string;
  responses: CommentItem[]; // delete later
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
};

const initialState: CommentsState = {
  items: [],
  status: "idle",
  error: null,
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
      };
    });

    return comments;
  }
);

export const selectCommentStatus = (state) => state.comments.status;
export const selectCommentByPostId = (state) => state.comments.items;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addAComment(
      state,
      action: PayloadAction<{
        content: string;
        post_id: number;
        response_id: number;
        responses: CommentItem[];
      }>
    ) {
      const newComment = {
        id: ++currentId,
        user_id: 5,
        ...action.payload,
      };
      // const newComment = {
      //   id: 100,
      //   body: "Hi",
      //   reply_to: 2,
      //   comments: [],
      // };
      console.log(newComment);
      state.items = [newComment, ...state.items];
      console.log(state.items);
    },
  },
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
      });
  },
});

export const { addAComment } = commentsSlice.actions;
