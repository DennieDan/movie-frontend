import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { COMMENTS } from "../dummy-comments.ts";

let currentId: number = 9;

export type CommentItem =
  | {
      id: number | undefined;
      user_id: number;
      post_id: number;
      response_id: number | undefined;
      content: string;
      // created_at: string,
      comments: CommentItem[]; // delete later
    }
  | undefined;

type CommentsState = {
  items: CommentItem[];
};

const initialState: CommentsState = {
  items: COMMENTS,
};

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
        comments: CommentItem[];
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
});

export const { addAComment } = commentsSlice.actions;
