import { FormEvent } from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { POSTS } from "../dummy-posts";

export type PostItem = {
  id: number;
  title: string;
  content: string;
  movie: string;
  topic: string;
  author: string;
  votes: number;
  created_at: string;
};

type PostsState = {
  items: PostItem[];
  itemsDisplay: PostItem[];
};

const initialState: PostsState = {
  items: POSTS,
  itemsDisplay: POSTS,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createAPost(state, action) {},
    editAPost(state, action) {},
    deleteAPost(state, action) {},
    searchPostListDisplay(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.itemsDisplay = state.items;
      } else {
        state.itemsDisplay = state.items.filter(
          (post) => post.topic === action.payload
        );
      }
    },
  },
});

// for use in the required components
export const { createAPost, editAPost, deleteAPost, searchPostListDisplay } =
  postsSlice.actions;
