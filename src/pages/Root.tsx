import { Stack, Theme, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "../store/store.ts";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

export default function Root() {
  const theme: Theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
      h3: {
        fontFamily: "Helvetica",
        fontSize: 25,
        fontWeight: 600,
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
        <Stack width="100%" direction="column" spacing={5} alignItems="center">
          <Outlet />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
