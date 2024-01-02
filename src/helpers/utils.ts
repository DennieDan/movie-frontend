import {
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_MONTH,
  ONE_WEEK,
  ONE_YEAR,
} from "../constants.ts";
import { type PostItem as PostItemType } from "../store/posts-slice.ts";
import { type Topic as TopicType } from "../store/topics-slice.ts";
import { type Movie as MovieType } from "../store/movies-slice.ts";

export type SearchOptionType =
  | (TopicType & { group: string })
  | (MovieType & { group: string });

export function isTopicType(
  option: SearchOptionType
): option is TopicType & { group: string } {
  return option.group === "Topic";
}

export function formatCreateInterval(item: PostItemType): string {
  const inMiliSecond = new Date().getTime() - Date.parse(item.created_at);
  let res: string;
  let interval: number;
  if (inMiliSecond > ONE_YEAR) {
    interval = Math.ceil(inMiliSecond / ONE_YEAR);
    res = interval.toString() + " year";
  } else if (inMiliSecond > ONE_MONTH) {
    interval = Math.ceil(inMiliSecond / ONE_MONTH);
    res = interval.toString() + " month";
  } else if (inMiliSecond > ONE_WEEK) {
    interval = Math.ceil(inMiliSecond / ONE_WEEK);
    res = interval.toString() + " week";
  } else if (inMiliSecond > ONE_DAY) {
    interval = Math.ceil(inMiliSecond / ONE_DAY);
    res = interval.toString() + " day";
  } else if (inMiliSecond > ONE_HOUR) {
    interval = Math.ceil(inMiliSecond / ONE_HOUR);
    res = interval.toString() + " hour";
  } else if (inMiliSecond > ONE_MINUTE) {
    interval = Math.ceil(inMiliSecond / ONE_MINUTE);
    res = interval.toString() + " minute";
  } else {
    interval = 0;
    res = "";
  }

  return res !== ""
    ? interval > 1
      ? res + "s ago"
      : res + " ago"
    : "Just now";
}
