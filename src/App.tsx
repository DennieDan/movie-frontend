import {
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
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

const post_ex: PostItem = {
  id: 2,
  title: "Which series is suitable for family gathering?",
  content:
    "My big family intend to sit together every month, so I am finding activities for our bonding session. Do you think Home Alone is a good option for our family this month?",
  movie: "Home Alone",
  topic: "ask",
  author: "fafaiu",
  votes: 3,
  created_at: "2024-01-01T13:51:50.417-07:00",
};

type UserType = "member" | "guest";

function App() {
  const [user, setUser] = useState<UserType>("member");

  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
      h4: {
        textAlign: "left",
        fontWeight: 600,
      },
      subtitle2: {
        color: "#666967",
      },
      body1: {
        textAlign: "left",
        fontSize: 18,
      },
    },
  });

  return (
    <Provider store={store}>
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
                  <Badge badgeContent={4} color="error">
                    <NotificationsRoundedIcon fontSize="large" />
                  </Badge>
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
          {/* <Homepage /> */}
          <PostDetailpage item={post_ex} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
