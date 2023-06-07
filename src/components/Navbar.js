import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Typography} from "@material-ui/core";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../styling/theme"
import {Link} from "react-router-dom";

const Navbar = () => {
    const pages = [
        { text: 'Home', href: '/'},
        { text: 'About', href: '/about'},
        { text: 'Scoreboard', href: '/scoreboard'}
    ]

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography to="/" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Vibesphere
                    </Typography>
                    <div>
                        {pages.map((page) => (
                            <Button component={Link} to={page.href} color="inherit">{page.text}</Button>
                        ))}
                    </div>
                </Toolbar>
        </AppBar>
        </Box>
        </ThemeProvider>
    )
}

export default Navbar
