import {
  Autocomplete,
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
import { type Movie as MovieType } from "../../store/movies-slice.ts";
import { MOVIES } from "../../dummy-movies";
import { type Topic as TopicType } from "../../store/topics-slice.ts";
import { TOPICS } from "../../dummy-topics.ts";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { PostItem, createPost } from "../../store/posts-slice.ts";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { getAuthUser } from "../../store/auth-slice.ts";

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenAlert: () => void;
};

type CreatePostFormValues = {
  title: string;
  content: string;
  movie_id: number | null;
  topic_id: number | null;
};

type CreatePostReturnType = {
  error?: string;
  message?: string;
  post?: PostItem;
};

export default function CreatePostModal({
  open,
  onClose,
  onOpenAlert,
}: CreatePostModalProps) {
  const dispatch = useAppDispatch();
  const [createPostError, setCreatePostError] = useState<string>("");
  const authUser = useAppSelector(getAuthUser);
  const movieOptions: MovieType[] = MOVIES;
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
  const navigate = useNavigate();

  const formControl = useRef<HTMLFormElement>(null);

  async function onSubmit(data: CreatePostFormValues) {
    console.log({ ...data, author_id: authUser.id });
    // await createPost({ ...data, author_id: authUser.id });
    const response = (await dispatch(
      createPost({ ...data, author_id: authUser.id })
    )) as CreatePostReturnType;
    setCreatePostError(response.error);
    console.log(createPostError);
    if (createPostError === "") {
      formControl.current.reset();
      navigate("/");
      onClose();
      onOpenAlert();
    }
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
            ref={formControl}
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
                      onChange={(_event: unknown, newValue) => {
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
                      getOptionLabel={(option) => option.title}
                      onChange={(_event: unknown, newValue) => {
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
