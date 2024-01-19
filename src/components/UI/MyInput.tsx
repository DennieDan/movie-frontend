import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type MyInputProps = TextFieldProps;

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(function MyInput(
  { ...props },
  ref
) {
  return <TextField {...props} fullWidth ref={ref} />;
});

export default MyInput;
