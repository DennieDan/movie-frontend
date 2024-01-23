import {
  Autocomplete,
  AutocompleteRenderInputParams,
  FormControl,
  TextField,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  getSortBy,
  searchPostListDisplay,
  sortPostListDisplay,
} from "../../store/posts-slice.ts";
import { TOPICS } from "../../dummy-topics.ts";
import { MOVIES } from "../../dummy-movies.ts";
import { SearchOptionType, isTopicType } from "../../helpers/utils.ts";

const searchOptions: SearchOptionType[] = [
  ...TOPICS.map((topic) => Object.assign({}, topic, { group: "Topic" })),
  ...MOVIES.map((movie) => Object.assign({}, movie, { group: "Movie" })),
];

function SearchBar() {
  const [selectedOptions, setSelectedOptions] = useState<SearchOptionType[]>(
    []
  );
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(getSortBy);

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
    dispatch(sortPostListDisplay(sortBy));
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
            isTopicType(option)
              ? option.title
              : option.title + " " + option.year
          }
          onChange={handleChange}
          renderInput={renderInputTextField}
        />
      </form>
    </FormControl>
  );
}

export default SearchBar;
