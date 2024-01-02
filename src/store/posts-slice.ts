import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { POSTS } from "../dummy-posts.ts";
import { SearchOptionType, isTopicType } from "../helpers/utils.ts";

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
    searchPostListDisplay(state, action: PayloadAction<SearchOptionType[]>) {
      // console.log(action.payload);
      if (action?.payload.length === 0) {
        // console.log(0);
        state.itemsDisplay = state.items;
      } else {
        const input = action.payload.map((option) =>
          isTopicType(option) ? option.name : option.title
        );
        state.itemsDisplay = state.items.filter(
          (post) => input.includes(post.topic) || input.includes(post.movie)
        );
        console.log(input);
      }
    },
    sortPostListDisplay(state, action: PayloadAction<string>) {
      const sortBy = action.payload;
      if (sortBy === "start-date") {
        state.itemsDisplay = state.items
          .slice()
          .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      } else if (sortBy === "movie") {
        state.itemsDisplay = state.items
          .slice()
          .sort((a, b) => a.movie.localeCompare(b.movie));
      } else if (sortBy === "topic") {
        state.itemsDisplay = state.items
          .slice()
          .sort((a, b) => a.topic.localeCompare(b.topic));
      } else {
        state.itemsDisplay = state.items
          .slice()
          .sort((a, b) => b.votes - a.votes);
      }
    },
    upVote(state, action: PayloadAction<PostItem>) {},
    downVote(state, action: PayloadAction<PostItem>) {},
  },
});

// for use in the required components
export const {
  createAPost,
  editAPost,
  deleteAPost,
  searchPostListDisplay,
  sortPostListDisplay,
  upVote,
  downVote,
} = postsSlice.actions;
