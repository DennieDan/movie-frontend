import { createSlice } from "@reduxjs/toolkit";

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
};

const initialState: PostsState = {
  items: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost(state, action) {},
    editPost(state, action) {},
    deletePost(state, action) {},
  },
});

// for use in the required components
export const { createPost, editPost, deletePost } = postsSlice.actions;
