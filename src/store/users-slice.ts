import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserItem } from "./auth-slice";
import { END_POINT } from "../constants";
import { get } from "../helpers/http";
import { PostItem } from "./posts-slice";
import { CommentItem } from "./comments-slice";

export type UsersState = {
  users: UserItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type RawUserItem = {
  id: number;
  username: string;
  email: string;
  posts: PostItem[] | null;
  comments: CommentItem[] | null;
  savedPosts: PostItem[] | null;
};

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  console.log("fetching users");
  const response = await get(`${END_POINT}/api/users`);

  const data = (await response.json()) as RawUserItem[];

  const users: UserItem[] = data.map((rawUser) => {
    return {
      id: rawUser.id,
      username: rawUser.username,
      email: rawUser.email,
      posts: rawUser.posts,
      comments: rawUser.comments,
      savedPosts: rawUser.savedPosts,
    };
  });

  return users;
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserListStatus = (state) => state.users.status;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        console.log(state.users);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
