import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const pages = [
    { text: "Home", href: "/", key: 1 },
    { text: "About", href: "/about", key: 2 },
    { text: "Scoreboard", href: "/scoreboard", key: 3 },
  ];

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Button component={Link} to={"/"}>
            <Box
              component="img"
              src="/static/logos/svg/logo-no-background.svg"
              sx={{ width: "120px", height: "120px" }}
            />
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              flexWrap: "wrap",
            }}
          >
            {isAuthenticated && (
              <Button
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  pointerEvents: "none",
                }}
              >
                Hello, {user.email}
              </Button>
            )}
            {pages.map((page) => (
              <Button
                key={page.key}
                component={Link}
                to={page.href}
                color="inherit"
              >
                {page.text}
              </Button>
            ))}
            {isAuthenticated ? (
              <Button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            ) : (
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
