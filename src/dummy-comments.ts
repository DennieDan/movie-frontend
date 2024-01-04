import { type CommentItem as CommentItemType } from "./store/comments-slice.ts";

export const COMMENTS: CommentItemType[] = [
  {
    id: 1,
    post_id: 2,
    reply_to: undefined,
    body: "This is comment 1",
    comments: [],
  },
  { id: 2, post_id: 2, reply_to: 1, body: "This is comment 2", comments: [] },
  { id: 3, post_id: 2, reply_to: 2, body: "This is comment 3", comments: [] },
  {
    id: 4,
    post_id: 1,
    reply_to: undefined,
    body: "This is comment for post 1",
    comments: [],
  },
  {
    id: 5,
    post_id: 1,
    reply_to: undefined,
    body: "This is comment for post 1",
    comments: [],
  },
  {
    id: 6,
    post_id: 1,
    reply_to: 5,
    body: "This is reply comment for post 1",
    comments: [],
  },
  {
    id: 7,
    post_id: 3,
    reply_to: undefined,
    body: "This is comment for post 3",
    comments: [],
  },
  {
    id: 8,
    post_id: 3,
    reply_to: undefined,
    body: "This is comment for post 3",
    comments: [],
  },
  {
    id: 9,
    post_id: 3,
    reply_to: 7,
    body: "This is reply comment for post 3",
    comments: [],
  },
];
