import {
  Badge,
  Button,
  Stack,
  Theme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/Navigation/MainHeader";
import RouteIcon from "../components/Navigation/RouteIcon.tsx";
import ProfileTab from "../components/UI/ProfileTab.tsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { store } from "../store/store.ts";
import { useState } from "react";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

type UserType = "member" | "guest";

export default function Root() {
  const [user, setUser] = useState<UserType>("member");
  const theme: Theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
      h4: {
        textAlign: "left",
        fontWeight: 600,
      },
      subtitle1: {
        color: "#82a9e8",
        fontSize: 18,
      },
      subtitle2: {
        color: "#666967",
      },
      body1: {
        textAlign: "left",
        fontSize: 18,
      },
    },
    palette: {
      common: { black: "#000", white: "#fff" },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Stack direction="column" spacing={5}>
          <MainHeader>
            {user === "member" ? (
              <>
                <RouteIcon tooltip="Home">
                  <HomeRoundedIcon fontSize="large" />
                </RouteIcon>
                <RouteIcon tooltip="Create post">
                  <AddCircleRoundedIcon fontSize="large" />
                </RouteIcon>
                <RouteIcon tooltip="Notifications">
                  <Badge badgeContent={4} color="error">
                    <NotificationsRoundedIcon fontSize="large" />
                  </Badge>
                </RouteIcon>
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
          <Outlet />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
