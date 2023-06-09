import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  spacing: 20,
  palette: {
    mode: "dark",
    background: { paper: "rgb(5, 30, 52)" },
  },
});

const lightTheme = createTheme({
  spacing: 20,
  palette: {
    mode: "light",
  },
});

export { darkTheme, lightTheme };
