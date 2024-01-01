import { ThemeProvider, createTheme } from "@mui/material";
import MainHeader from "./components/Navigation/MainHeader";

function App() {
  // const defaultTheme = createMuiTheme();
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <MainHeader />
    </ThemeProvider>
  );
}

export default App;
