import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function ProfileTab() {
  return (
    <Button variant="outlined" size="large">
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Avatar sizes="small" />
        <Typography variant="h6" fontFamily="Arial">
          Dan Dinh
        </Typography>
      </Box>
      <IconButton>
        <KeyboardArrowDownRoundedIcon fontSize="large" />
      </IconButton>
    </Button>
  );
}
