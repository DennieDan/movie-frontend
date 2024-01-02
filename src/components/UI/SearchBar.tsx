import {
  Autocomplete,
  AutocompleteRenderInputParams,
  FormControl,
  TextField,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useAppDispatch } from "../../store/hooks.ts";
import { searchPostListDisplay } from "../../store/posts-slice.ts";
import { TOPICS } from "../../dummy-topics.ts";
import { MOVIES } from "../../dummy-movies.ts";
import { type Topic as TopicType } from "../../store/topics-slice.ts";
import { type Movie as MovieType } from "../../store/movies-slice.ts";

export type SearchOptionType =
  | (TopicType & { group: string })
  | (MovieType & { group: string });

export function isTopicType(
  option: SearchOptionType
): option is TopicType & { group: string } {
  return option.group === "Topic";
}

const searchOptions: SearchOptionType[] = [
  ...TOPICS.map((topic) => Object.assign({}, topic, { group: "Topic" })),
  ...MOVIES.map((movie) => Object.assign({}, movie, { group: "Movie" })),
];

function SearchBar() {
  const [selectedOptions, setSelectedOptions] = useState<SearchOptionType[]>(
    []
  );
  const dispatch = useAppDispatch();

  const renderInputTextField: (
    params: AutocompleteRenderInputParams
  ) => ReactNode = (params) => (
    <TextField
      {...params}
      placeholder="Select by categories or movies"
      variant="outlined"
    />
  );

  // function handleSubmit(event: FormEvent): void {
  //   event.preventDefault();
  //   dispatch(searchPostListDisplay(text));
  // }

  function handleChange(_: unknown, values: SearchOptionType[]): void {
    setSelectedOptions(values);
    // console.log(values);
    dispatch(searchPostListDisplay(values));
  }

  return (
    <FormControl fullWidth>
      <form>
        <Autocomplete
          id="search-bar-autocomplete"
          multiple
          filterSelectedOptions
          value={selectedOptions}
          options={searchOptions}
          groupBy={(option) => option.group}
          getOptionLabel={(option) =>
            isTopicType(option) ? option.name : option.title + " " + option.year
          }
          onChange={handleChange}
          renderInput={renderInputTextField}
        />
      </form>
    </FormControl>
  );
}

export default SearchBar;
