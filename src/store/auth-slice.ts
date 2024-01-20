import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { END_POINT } from "../constants";
import { PostItem } from "./posts-slice";
import { CommentItem } from "./comments-slice";

export type UserItem = {
  id: number;
  username: string;
  email: string;
  posts: PostItem[] | null;
  comments: CommentItem[] | null;
  savedPosts: PostItem[] | null;
  created_at: string;
  updated_at: string;
};

type Status = "idle" | "loading" | "succeeded" | "failed";

type UserState = {
  msg: string | null;
  user: UserItem | null;
  //   token: string | null;
  status: Status;
  error: string | null;
};

const initialState: UserState = {
  msg: "",
  user: null,
  //   token: null,
  status: "idle",
  error: null,
};

type RawLoginPost = {
  message?: string;
  error?: string;
  user?: UserItem;
};

export const loginUser = createAsyncThunk(
  "user/Login",
  async (body: { username: string; password: string }) => {
    const response = await fetch(`${END_POINT}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = (await response.json()) as RawLoginPost;
    console.log(data);

    return data;
  }
);

export const validateUser = createAsyncThunk("user/Validate", async () => {
  console.log("co run validateUser1");

  const response = await fetch(`${END_POINT}/api/validate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  console.log("co run validateUser2");

  const data = (await response.json()) as RawLoginPost;
  console.log("co run validateUser");

  return data;
});

export const getUserError = (state) => state.user.error;
export const getUserStatus = (state) => state.user.status;
export const getUserMessage = (state) => state.user.msg;
export const getAuthUser = (state) => state.user.user;

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.status = "failed";
          state.msg = "";
        } else {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.msg = action.payload.message;
          state.error = "";
        }

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(validateUser.pending, (state) => {
        state.status = "loading";
        console.log("validate:loading");
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.status = "failed";
          state.msg = "";
        } else {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.msg = action.payload.message;
          state.error = "";
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          console.log("Infulfilled" + action.payload.user);
        }
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("validate:failed");
        console.log(state.error);
      });
  },
});
