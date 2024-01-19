import { Box, Link, Stack, Typography } from "@mui/material";
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRef } from "react";

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const formObject = useRef<HTMLFormElement>(null);

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    formObject.current.reset();
  }

  return (
    <Box
      width="50%"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{
        padding: "30px 20px",
        borderRadius: "10px",
        backgroundColor: "grey.50",
        boxShadow: "2px 2px 2px grey.500",
      }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="start"
      >
        <Typography variant="h3">Sign in</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>Doesn't have an account yet?</Typography>
          <Link href="/signup">
            <Typography
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              Sign Up
            </Typography>
          </Link>
        </Stack>
        <Box
          component="form"
          sx={{ marginTop: "40px", width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          ref={formObject}
        >
          <Stack direction="column" spacing={5}>
            <MyInput
              id="login-username"
              label="Username"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <MyInput
              id="login-password"
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <MyButton type="submit">SIGN IN</MyButton>
          </Stack>
        </Box>
        <DevTool control={control} />
      </Box>
    </Box>
  );
}
