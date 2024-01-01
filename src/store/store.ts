import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./posts-slice.ts";

export const store = configureStore({
  reducer: {
    cart: postsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
