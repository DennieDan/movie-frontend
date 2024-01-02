import { Box, Typography } from "@mui/material";

type MovieTabProps = {
  movie: string;
};

export default function MovieTab({ movie }: MovieTabProps) {
  return (
    <Box
      width="10%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ borderRadius: "2px", borderColor: "grey.500", border: 2 }}
    >
      <Typography fontFamily="Roboto">{movie}</Typography>
    </Box>
  );
}
