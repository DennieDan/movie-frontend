import { Box, Typography } from "@mui/material";

type MovieTabProps = {
  movie: string;
};

export default function MovieTab({ movie }: MovieTabProps) {
  return (
    <Box
      width="fit-content"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: "2px",
        borderColor: "grey.500",
        border: 1,
        padding: "0px 2px",
      }}
    >
      <Typography fontFamily="Roboto">{movie}</Typography>
    </Box>
  );
}
