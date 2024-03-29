import { Box, Link, Stack, Typography } from "@mui/material";
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserError, getUserStatus, loginUser } from "../store/auth-slice.ts";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(getUserError);
  const loginStatus = useAppSelector(getUserStatus);
  // const loginMessage = useAppSelector(getUserMessage);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // const formControl = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormValues) {
    await dispatch(loginUser(data));
    if (loginStatus === "idle") {
      navigate("/");
    }
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
          <Link href="/register">
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
        >
          <Stack direction="column" spacing={5}>
            <MyInput
              id="login-username"
              label="Username"
              {...register("username", { required: "Username is required" })}
              error={
                !!errors.username ||
                loginError === "Invalid username or password"
              }
              helperText={
                errors.username?.message ||
                loginError === "Invalid username or password"
              }
            />
            <MyInput
              id="login-password"
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={
                !!errors.password ||
                new RegExp(".*password.*", "i").test(loginError)
              }
              helperText={errors.password?.message || loginError}
            />
            <MyButton type="submit">SIGN IN</MyButton>
          </Stack>
        </Box>
        <DevTool control={control} />
      </Box>
    </Box>
  );
}
