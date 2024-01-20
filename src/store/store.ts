import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./posts-slice.ts";
import { commentsSlice } from "./comments-slice.ts";
import { authSlice } from "./auth-slice.ts";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
    user: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
