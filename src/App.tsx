import {
  Box,
  Button,
  IconButton,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MainHeader from "./components/Navigation/MainHeader";
import ProfileTab from "./components/UI/ProfileTab.tsx";
import Homepage from "./pages/Homepage.tsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { useState } from "react";

type UserType = "member" | "guest";

function App() {
  const [user, setUser] = useState<UserType>("member");
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" spacing={5}>
        <MainHeader>
          {user === "member" ? (
            <>
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
            </>
          ) : (
            <>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" size="large">
                  Sign In
                </Button>
                <Button variant="outlined" size="large">
                  Sign Up
                </Button>
              </Stack>
            </>
          )}
        </MainHeader>
        <Homepage />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
