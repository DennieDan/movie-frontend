import { Box, IconButton, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SearchBar from "../UI/SearchBar.tsx";
import ProfileTab from "../UI/ProfileTab.tsx";

export default function MainHeader() {
  return (
    <Box
      width="100%"
      height="80px"
      sx={{ background: "#82a9e8", padding: "5px 20px", borderRadius: "5px" }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Typography
            align="center"
            variant="h5"
            color="blue"
            fontFamily="Arial"
            fontWeight="700"
          >
            Movie Hub
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" width="35%">
          <SearchBar />
        </Box>
        <IconButton onClick={() => {}}>
          <HomeRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <NotificationsRoundedIcon fontSize="large" />
        </IconButton>
        <ProfileTab />
      </Box>
    </Box>
  );
}
