import { Stack, Theme, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "../store/store.ts";
import { ConfirmProvider } from "material-ui-confirm";

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
      h5: {
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
      body2: {
        textAlign: "left",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "Helvetica",
      },
    },
    palette: {
      common: { black: "#000", white: "#fff" },
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <Stack
            width="100%"
            direction="column"
            spacing={5}
            alignItems="center"
          >
            <Outlet />
          </Stack>
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  );
}
