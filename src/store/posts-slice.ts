import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POSTS } from "../dummy-posts.ts";
import { SearchOptionType, isTopicType } from "../helpers/utils.ts";
import { get } from "../helpers/http.ts";

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

type Status = "idle" | "loading" | "succeeded" | "failed";

type PostsState = {
  posts: PostItem[];
  postsDisplay: PostItem[];
  status: Status;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  postsDisplay: [],
  status: "idle",
  error: null,
};

type RawDataPost = {
  id: number;
  title: string;
  content: string;
  movie_id: number;
  topic_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await get("http://localhost:3000/api/posts");

  const data = (await response.json()) as RawDataPost[];

  const posts: PostItem[] = data.map((rawPost) => {
    return {
      id: rawPost.id,
      title: rawPost.title,
      content: rawPost.content,
      movie: "young Sheldon",
      topic: "Netflix",
      author: "tonyton",
      votes: 250,
      created_at: rawPost.created_at,
    };
  });

  return posts as PostItem[];
});
// selector functions
export const selectDisplayPosts = (state) => state.posts.postsDisplay;
export const getPostsError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;

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
    createAPost(state, action) {},
    editAPost(state, action) {},
    deleteAPost(state, action) {},
    searchPostListDisplay(state, action: PayloadAction<SearchOptionType[]>) {
      // console.log(action.payload);
      if (action?.payload.length === 0) {
        // console.log(0);
        state.postsDisplay = state.posts;
      } else {
        const input = action.payload.map((option) =>
          isTopicType(option) ? option.name : option.title
        );
        state.postsDisplay = state.posts.filter(
          (post) => input.includes(post.topic) || input.includes(post.movie)
        );
        console.log(input);
      }
    },
    sortPostListDisplay(state, action: PayloadAction<string>) {
      const sortBy = action.payload;
      if (sortBy === "start-date") {
        state.postsDisplay = state.posts
          .slice()
          .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      } else if (sortBy === "movie") {
        state.postsDisplay = state.posts
          .slice()
          .sort((a, b) => a.movie.localeCompare(b.movie));
      } else if (sortBy === "topic") {
        state.postsDisplay = state.posts
          .slice()
          .sort((a, b) => a.topic.localeCompare(b.topic));
      } else {
        state.postsDisplay = state.posts
          .slice()
          .sort((a, b) => b.votes - a.votes);
      }
    },
    upVote(state, action: PayloadAction<PostItem>) {},
    downVote(state, action: PayloadAction<PostItem>) {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = action.payload;
        state.postsDisplay = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
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
