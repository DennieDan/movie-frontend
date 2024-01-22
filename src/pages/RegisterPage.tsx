import { Box, Link, Stack, Typography } from "@mui/material";
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { UserItem } from "../store/auth-slice.ts";
import { END_POINT } from "../constants.ts";
import { useNavigate } from "react-router-dom";

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};

type RegisterReturnType = {
  error?: string;
  message?: string;
  user?: UserItem;
};

export default function RegisterPage() {
  const [registerError, setRegisterError] = useState<string>("");
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  async function registerUser(body: RegisterFormValues) {
    const response = await fetch(`${END_POINT}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as RegisterReturnType;
    console.log("data");
    console.log(data);
    console.log("data.error");
    console.log(data.error);
    if (data.error) {
      setRegisterError(data.error);
      return data;
    } else {
      navigate("/login");
    }
  }
  async function onSubmit(data: RegisterFormValues) {
    await registerUser(data);
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
        <Typography variant="h3">Sign up</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>Already have an account?</Typography>
          <Link href="/register">
            <Typography
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              Sign In
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
              id="register-username"
              label="Username"
              {...register("username", { required: "Username is required" })}
              error={
                !!errors.username ||
                new RegExp(".*username.*", "i").test(registerError)
              }
              helperText={
                errors.username?.message ||
                (new RegExp(".*username.*", "i").test(registerError) &&
                  registerError)
              }
            />
            <MyInput
              id="register-email"
              label="Email Address"
              {...register("email", { required: "Email address is required" })}
              error={
                !!errors.email ||
                new RegExp(".*email.*", "i").test(registerError)
              }
              helperText={
                errors.email?.message ||
                (new RegExp(".*email.*", "i").test(registerError) &&
                  registerError)
              }
            />
            <MyInput
              id="register-password"
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={
                !!errors.password ||
                new RegExp(".*password.*", "i").test(registerError)
              }
              helperText={
                errors.password?.message ||
                (new RegExp(".*password.*", "i").test(registerError) &&
                  registerError)
              }
            />
            <MyButton type="submit">SIGN UP</MyButton>
          </Stack>
        </Box>
        <DevTool control={control} />
      </Box>
    </Box>
  );
}
