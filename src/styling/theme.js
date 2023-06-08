import {createTheme} from "@mui/material/styles";

const theme = createTheme({
        palette: {
            mode: "dark",
            background: {paper: "rgb(5, 30, 52)"},
        }
    });

const lightTheme = createTheme({
    palette: {
        mode: "light",
    }
})

export {
    theme,
    lightTheme
}