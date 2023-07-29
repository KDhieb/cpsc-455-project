import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser, clearUser, createUserPlaylist } from "../slices/userSlice";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pages = [
    { text: "Home", href: "/", key: 1 },
    { text: "About", href: "/about", key: 2 },
    { text: "Scoreboard", href: "/scoreboard", key: 3 },
  ];

  let token_type = process.env.REACT_APP_AUTH0_TOKEN_TYPE;
  console.log(token_type);

  const [anchorEl, setAnchorEl] = useState(null);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCreatingPlaylist(false);
    setNewPlaylistName("");
  };

  const handleCreatePlaylist = () => {
    setCreatingPlaylist(true);
  };

  const handleSavePlaylist = () => {    
    if (newPlaylistName) {
      if (token_type === "getAccessTokenWithPopup") {
        dispatch(
          createUserPlaylist({
            email: user.email,
            playlistName: newPlaylistName,
            getAccessTokenWithPopup,
          })
        );
      } else {
        dispatch(
          createUserPlaylist({
            email: user.email,
            playlistName: newPlaylistName,
            getAccessTokenSilently,
          })
        );
      }

      setNewPlaylistName("");
      setCreatingPlaylist(false);
      handleClose();
    }
  };

  const handleInputChange = (event) => {
    setNewPlaylistName(event.target.value);
  };

  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    logout,
    getAccessTokenWithPopup,
    getAccessTokenSilently
  } = useAuth0();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (token_type === "getAccessTokenWithPopup") {
        dispatch(signinUser({ user, getAccessTokenWithPopup, token_type }));
      } else {
        dispatch(signinUser({ user, getAccessTokenSilently, token_type }));
      }
    } else {
      dispatch(clearUser());
    }
  }, [isAuthenticated]);  

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
            {isAuthenticated && (
              <Button onClick={(event) => handleClick(event)}>Playlists</Button>
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
      {userState && (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleCreatePlaylist}>
            Create new playlist
          </MenuItem>
          {creatingPlaylist && (
            <Box display="flex" flexDirection="column">
              <TextField
                label="New playlist name"
                value={newPlaylistName}
                onChange={handleInputChange}
              />
              <Button onClick={handleSavePlaylist}>Save</Button>
            </Box>
          )}
          {!creatingPlaylist &&
            userState.playlists.map((playlist) => {
              return (
                <MenuItem
                  key={playlist._id}
                  component={Link}
                  to={`/playlist/${playlist._id}`}
                >
                  {playlist.name}
                </MenuItem>
              );
            })}
        </Menu>
      )}
    </Box>
  );
}
