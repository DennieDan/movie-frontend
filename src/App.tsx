import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Root from "./pages/Root.tsx";
import { Badge, Stack, Button, Snackbar, Alert } from "@mui/material";
import MainHeader from "./components/Navigation/MainHeader.tsx";
import RouteIcon from "./components/Navigation/RouteIcon.tsx";
import ProfileTab from "./components/UI/ProfileTab.tsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { FunctionComponent, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import {
  UserItem,
  getAuthUser,
  getUserStatus,
  validateUser,
} from "./store/auth-slice.ts";
import RegisterPage from "./pages/RegisterPage.tsx";
import CreatePostModal from "./components/Post/CreatePostModal.tsx";
import HomePage from "./pages/HomePage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";

const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getUserStatus);
  const authUser = useAppSelector(getAuthUser) as UserItem;
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus == "idle") {
      dispatch(validateUser());
    }
  }, [authStatus, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAlert = () => {
    setAlert(true);
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <MainHeader>
      {authStatus === "succeeded" ? (
        <>
          <RouteIcon tooltip="Home" onClick={handleToHome}>
            <HomeRoundedIcon fontSize="large" />
          </RouteIcon>
          <RouteIcon tooltip="Create post" onClick={handleClickOpen}>
            <AddCircleRoundedIcon fontSize="large" />
          </RouteIcon>
          <RouteIcon tooltip="Notifications" onClick={() => {}}>
            <Badge badgeContent={4} color="error">
              <NotificationsRoundedIcon fontSize="large" />
            </Badge>
          </RouteIcon>
          <ProfileTab username={authUser.username} />
        </>
      ) : (
        <>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" size="large" href="/login">
              Sign In
            </Button>
            <Button variant="outlined" size="large" href="/register">
              Sign Up
            </Button>
          </Stack>
        </>
      )}
      <CreatePostModal
        open={open}
        onClose={handleClose}
        onOpenAlert={handleOpenAlert}
      />
      <Snackbar open={alert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Post created successfully
        </Alert>
      </Snackbar>
    </MainHeader>
  );
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <>
            <Header />
            <HomePage />
          </>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "posts/:id",
        element: (
          <>
            <Header />
            <PostDetailPage />
          </>
        ),
      },
    ],
  },
]);

// declare module "@mui/styles/defaultTheme" {
//   interface DefaultTheme extends Theme {}
// }

// const post_ex: PostItem = {
//   id: 2,
//   title: "Which series is suitable for family gathering?",
//   content:
//     "My big family intend to sit together every month, so I am finding activities for our bonding session. Do you think Home Alone is a good option for our family this month?",
//   movie: "Home Alone",
//   author: "fafaiu",
//   votes: 3,
//   topic: "ask",
//   created_at: "2024-01-01T13:51:50.417-07:00",
// };

// type UserType = "member" | "guest";

function App() {
  // const [user, setUser] = useState<UserType>("member");

  // const theme: Theme = createTheme({
  //   typography: {
  //     button: {
  //       textTransform: "none",
  //     },
  //     h4: {
  //       textAlign: "left",
  //       fontWeight: 600,
  //     },
  //     subtitle1: {
  //       color: "#82a9e8",
  //       fontSize: 18,
  //     },
  //     subtitle2: {
  //       color: "#666967",
  //     },
  //     body1: {
  //       textAlign: "left",
  //       fontSize: 18,
  //     },
  //   },
  //   palette: {
  //     common: { black: "#000", white: "#fff" },
  //   },
  // });

  // return (
  //   <Provider store={store}>
  //     <ThemeProvider theme={theme}>
  //       <Stack direction="column" spacing={5}>
  //         <MainHeader>
  //           {user === "member" ? (
  //             <>
  //               <RouteIcon tooltip="Home">
  //                 <HomeRoundedIcon fontSize="large" />
  //               </RouteIcon>
  //               <RouteIcon tooltip="Create post">
  //                 <AddCircleRoundedIcon fontSize="large" />
  //               </RouteIcon>
  //               <RouteIcon tooltip="Notifications">
  //                 <Badge badgeContent={4} color="error">
  //                   <NotificationsRoundedIcon fontSize="large" />
  //                 </Badge>
  //               </RouteIcon>
  //               <ProfileTab />
  //             </>
  //           ) : (
  //             <>
  //               <Stack direction="row" spacing={2}>
  //                 <Button variant="outlined" size="large">
  //                   Sign In
  //                 </Button>
  //                 <Button variant="outlined" size="large">
  //                   Sign Up
  //                 </Button>
  //               </Stack>
  //             </>
  //           )}
  //         </MainHeader>
  //         {/* <Homepage /> */}
  //         <PostDetailpage item={post_ex} />
  //       </Stack>
  //     </ThemeProvider>
  //   </Provider>
  // );
  return <RouterProvider router={Router} />;
}

export default App;
