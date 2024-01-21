import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import MyInput from "../UI/MyInput.tsx";
import { ReactNode, Ref, useState } from "react";
import { type Movie as MovieType } from "../../store/movies-slice.ts";
import { MOVIES } from "../../dummy-movies";
import { type Topic as TopicType } from "../../store/topics-slice.ts";
import { TOPICS } from "../../dummy-topics.ts";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
};

type CreatePostFormValues = {
  title: string;
  content: string;
  movie_id: number;
  topic_id: number;
};

export default function CreatePostModal({
  open,
  onClose,
}: CreatePostModalProps) {
  // const [movie, setMovie] = useState<MovieType>(null);
  const movieOptions: MovieType[] = MOVIES;
  // const [topic, setTopic] = useState<TopicType>(null);
  const topicOptions: TopicType[] = TOPICS;

  const form = useForm<CreatePostFormValues>({
    defaultValues: {
      title: "",
      content: "",
      movie_id: null,
      topic_id: null,
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  // function handleChangeMovie(_: unknown, value: MovieType): void {
  //   setMovie(value);
  // }

  // function handleChangeTopic(_: unknown, value: TopicType): void {
  //   setTopic(value);
  // }

  function handleCreatePost() {
    onClose();
  }

  async function onSubmit(data: CreatePostFormValues) {
    // await dispatch(loginUser(data));
    await console.log(data);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-post-title"
      aria-describedby="create-post-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Create Post
        <IconButton style={{ float: "right" }} onClick={onClose}>
          <CloseIcon></CloseIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent id="create-post-title">
        <DialogContentText id="create-post-description">
          <Stack
            id="create-post"
            component="form"
            direction="column"
            spacing={2}
            margin={2}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <MyInput
              id="create-post-title"
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Controller
                name="movie_id"
                control={control}
                render={({ field }) => {
                  const { onChange, value, ref } = field;
                  return (
                    <Autocomplete
                      id="create-post-movie"
                      filterSelectedOptions
                      value={
                        value
                          ? movieOptions.find((option) => {
                              return value == option.id;
                            }) ?? null
                          : null
                      }
                      options={movieOptions}
                      getOptionLabel={(option) =>
                        option.title + " " + option.year
                      }
                      onChange={(event: unknown, newValue) => {
                        onChange(newValue ? newValue.id : null);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select a movie"
                          variant="outlined"
                          inputRef={ref}
                        />
                      )}
                      sx={{ width: "60%" }}
                    />
                  );
                }}
              />
              <Controller
                name="topic_id"
                rules={{ required: "Topic is required" }}
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const { onChange, value, ref } = field;
                  return (
                    <Autocomplete
                      id="create-post-topic"
                      filterSelectedOptions
                      value={
                        value
                          ? topicOptions.find((option) => {
                              return value == option.id;
                            }) ?? null
                          : null
                      }
                      options={topicOptions}
                      getOptionLabel={(option) => option.name}
                      onChange={(event: unknown, newValue) => {
                        onChange(newValue ? newValue.id : null);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select a topic"
                          variant="outlined"
                          inputRef={ref}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      sx={{ width: "30%" }}
                    />
                  );
                }}
              />
            </Box>
            <MyInput
              id="create-post-content"
              label="Content"
              multiline
              rows={5}
              {...register("content", { required: "Post content is required" })}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          form="create-post"
          color="primary"
          variant="contained"
          type="submit"
        >
          Post
        </Button>
        <DevTool control={control} />
      </DialogActions>
    </Dialog>
  );
}
