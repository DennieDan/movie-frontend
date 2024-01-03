import {
  Badge,
  Button,
  Stack,
  Theme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MainHeader from "./components/Navigation/MainHeader";
import ProfileTab from "./components/UI/ProfileTab.tsx";
// import Homepage from "./pages/Homepage.tsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import PostDetailpage from "./pages/PostDetailpage.tsx";
import Homepage from "./pages/Homepage.tsx";
import { PostItem } from "./store/posts-slice.ts";
import RouteIcon from "./components/Navigation/RouteIcon.tsx";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const post_ex: PostItem = {
  id: 2,
  title: "Which series is suitable for family gathering?",
  content:
    "My big family intend to sit together every month, so I am finding activities for our bonding session. Do you think Home Alone is a good option for our family this month?",
  movie: "Home Alone",
  author: "fafaiu",
  votes: 3,
  topic: "ask",
  created_at: "2024-01-01T13:51:50.417-07:00",
};

type UserType = "member" | "guest";

function App() {
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
          {/* <Homepage /> */}
          <PostDetailpage item={post_ex} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
