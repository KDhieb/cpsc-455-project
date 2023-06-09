import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  spacing: 15,
  palette: {
    mode: "dark",
    background: { paper: "rgb(5, 30, 52)" },
  },
});

const lightTheme = createTheme({
  spacing: 15,
  palette: {
    mode: "light",
  },
});

export { darkTheme, lightTheme };
