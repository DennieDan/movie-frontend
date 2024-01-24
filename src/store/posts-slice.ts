import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SearchOptionType } from "../helpers/utils.ts";
import { get } from "../helpers/http.ts";
import { END_POINT } from "../constants.ts";
import { Movie } from "./movies-slice.ts";
import { Topic } from "./topics-slice.ts";
import { UserItem } from "./auth-slice.ts";
import { CommentItem } from "./comments-slice.ts";

export type PostItem = {
  id: number;
  title: string;
  content: string;
  movie: Movie;
  topic: Topic;
  author: UserItem;
  comments: CommentItem[];
  votes: number;
  created_at: string;
};

type Status = "idle" | "loading" | "succeeded" | "failed";

type PostsState = {
  posts: PostItem[];
  postsDisplay: PostItem[];
  sortBy: string;
  status: Status;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  postsDisplay: [],
  sortBy: "start-date",
  status: "idle",
  error: null,
};

type RawDataPost = {
  id: number;
  title: string;
  content: string;
  movie: Movie;
  topic: Topic;
  author: UserItem;
  comments: CommentItem[];
  votes: number;
  created_at: string;
  updated_at: string;
};

type CreatePostReturnType = {
  error?: string;
  message?: string;
  post?: PostItem;
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await get("http://localhost:3000/api/posts");

  const data = (await response.json()) as RawDataPost[];

  const posts: PostItem[] = data.map((rawPost) => {
    return {
      id: rawPost.id,
      title: rawPost.title,
      content: rawPost.content,
      movie: rawPost.movie,
      topic: rawPost.topic,
      author: rawPost.author,
      comments: rawPost.comments,
      votes: rawPost.votes,
      created_at: rawPost.created_at,
    };
  });

  return posts as PostItem[];
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (body: {
    title: string;
    content: string;
    movie_id: number | null;
    topic_id: number | null;
    author_id: number;
  }) => {
    const response = await fetch(`${END_POINT}/api/create_post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as CreatePostReturnType;
    return data;
  }
);

export const upvotePost = createAsyncThunk(
  "posts/upvotePost",
  async (body: { author_id: number; post_id: number }) => {
    const response = await fetch(
      `${END_POINT}/api/upvote_post/${body.author_id}/${body.post_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("upvote in slice 2");

    const data = (await response.json()) as { message: string };
    console.log(data);
    return data;
  }
);
export const downvotePost = createAsyncThunk(
  "posts/downvotePost",
  async (body: { author_id: number; post_id: number }) => {
    const response = await fetch(
      `${END_POINT}/api/downvote_post/${body.author_id}/${body.post_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as { message: string };
    return data;
  }
);

// selector functions
export const selectDisplayPosts = (state) => {
  console.log("selecting");
  console.log(state.posts.postsDisplay);
  return state.posts.postsDisplay;
};
export const getAllPosts = (state) => state.posts.posts;
export const getPostsError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;
export const getSortBy = (state) => state.posts.sortBy;

// function isSearchedPost(post: PostItem, searchOptions: string[]): boolean {
//   return (
//     searchOptions.includes(post.topic) || searchOptions.includes(post.movie)
//   );
// }

// function sortedPosts(postList: PostItem[], sortBy: string): PostItem[] {
//   if (sortBy === "start-date") {
//     postList = postList
//       .slice()
//       .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
//   } else if (sortBy === "movie") {
//     postList = postList.slice().sort((a, b) => a.movie.localeCompare(b.movie));
//   } else if (sortBy === "topic") {
//     postList = postList.slice().sort((a, b) => a.topic.localeCompare(b.topic));
//   } else {
//     postList = postList.slice().sort((a, b) => b.votes - a.votes);
//   }
//   return postList;
// }

// export const selectDisplayPosts = (
//   state,
//   searchOptions: SearchOptionType[],
//   sortBy: string
// ) => {
//   const input = searchOptions.map((option) =>
//     isTopicType(option) ? option.name : option.title
//   );
//   return sortedPosts(
//     state.posts.filter(
//       (post) => searchOptions.length === 0 || isSearchedPost(post, input)
//     ),
//     sortBy
//   );
// };

export const selectPostById = (state, postId) =>
  state.posts.postsDisplay.find((post) => post.id === postId);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    searchPostListDisplay(state, action: PayloadAction<SearchOptionType[]>) {
      // console.log(action.payload);
      if (action?.payload.length === 0) {
        // console.log(0);
        state.postsDisplay = state.posts;
      } else {
        const input = action.payload.map((option) => option.title);
        state.postsDisplay = state.posts.filter(
          (post) =>
            input.includes(post.topic.title) || input.includes(post.movie.title)
        );
        console.log(input);
      }
    },
    sortPostListDisplay(state, action: PayloadAction<string>) {
      console.log("sorting");
      state.sortBy = action.payload;
      if (state.sortBy === "start-date") {
        state.postsDisplay = state.postsDisplay
          .slice()
          .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      } else if (state.sortBy === "movie") {
        state.postsDisplay = state.postsDisplay
          .slice()
          .sort((a, b) => a.movie.title.localeCompare(b.movie.title));
      } else if (state.sortBy === "topic") {
        state.postsDisplay = state.postsDisplay
          .slice()
          .sort((a, b) => a.topic.title.localeCompare(b.topic.title));
      } else {
        state.postsDisplay = state.postsDisplay
          .slice()
          .sort((a, b) => b.votes - a.votes);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log("succeeded");
        state.posts = action.payload;
        state.postsDisplay = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(upvotePost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(downvotePost.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

// for use in the required components
export const { searchPostListDisplay, sortPostListDisplay } =
  postsSlice.actions;
