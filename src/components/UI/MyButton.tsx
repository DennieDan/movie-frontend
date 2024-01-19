import { Button, ButtonProps } from "@mui/material";

type MyButtonProps = ButtonProps;

export default function MyButton({ ...props }: MyButtonProps) {
  const { children, ...otherProps } = props;
  return (
    <Button
      variant="contained"
      sx={{
        mt: "10px",
        fontSize: 18,
        fontWeight: 500,
        borderRadius: "5px",
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
}
