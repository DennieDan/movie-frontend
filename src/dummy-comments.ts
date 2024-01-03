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
];
