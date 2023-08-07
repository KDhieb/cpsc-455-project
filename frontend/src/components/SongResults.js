// Some sections of the code relating to Playlists are attributed to help from ChatGPT
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { useRef, useState } from "react";
import LikeButton from "./LikeButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../slices/userSlice";
import SongPopupView from "./SongPopupView";

export default function SongResults({
  subtitleText,
  songs,
  handleSongSelect,
  handleDelete,
}) {
  const albumClickedRef = useRef(false);
  const favoritedRef = useRef(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [popupSong, setPopupSong] = useState(null);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  let token_type = process.env.REACT_APP_AUTH0_TOKEN_TYPE;

  const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  // Playlist Callbacks
  const handleClick = (event, song) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentSong(song);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCreatingPlaylist(false);
    setNewPlaylistName("");
  };

  const addRemoveSongPlaylist = (playlist, add) => {
    if (add) {
      if (token_type === "getAccessTokenWithPopup") {
        dispatch(
          addSongToPlaylist({
            playlistId: playlist._id,
            songData: currentSong,
            getAccessTokenWithPopup,
          })
        );
      } else {
        dispatch(
          addSongToPlaylist({
            playlistId: playlist._id,
            songData: currentSong,
            getAccessTokenSilently,
          })
        );
      }
    } else {
      if (token_type === "getAccessTokenWithPopup") {
        dispatch(
          removeSongFromPlaylist({
            playlistId: playlist._id,
            spotifyId: currentSong.id,
            getAccessTokenWithPopup,
          })
        );
      } else {
        dispatch(
          removeSongFromPlaylist({
            playlistId: playlist._id,
            spotifyId: currentSong.id,
            getAccessTokenSilently,
          })
        );
      }
    }
    handleClose();
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

  // Song Callbacks
  const handleAlbumClick = () => {
    albumClickedRef.current = true;
  };

  const handleFavoritedCallback = () => {
    favoritedRef.current = true;
  };

  const handleSongClick = (song) => {
    if (favoritedRef.current) {
      favoritedRef.current = false;
    } else if (albumClickedRef.current) {
      albumClickedRef.current = false;
    } else {
      setPopupSong(song);
      handleSongSelect(song);
      setDisplayPopup(true);
    }
  };

  const handlePopupClose = () => {
    setDisplayPopup(false);
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
      <Paper
        className="results-container"
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          margin: "10px 10px",
        }}
      >
        {/* https://codesandbox.io/s/great-johnson-72lzdd?file=/Demo.tsx:2370-2392 */}
        <ListItem component="div" disablePadding>
          <ListItem sx={{ height: 56 }}>
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LibraryMusicIcon />
            </ListItemIcon>
            <ListItemText
              primary={subtitleText}
              primaryTypographyProps={{
                color: "primary",
                fontWeight: "medium",
              }}
            />
          </ListItem>
        </ListItem>
        <Divider />
        <List
          className="results-list"
          sx={{
            width: "100%",
            maxWidth: "md",
            bgcolor: "background.paper",
            maxHeight: "500px",
            overflow: "hidden",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgb(5, 30, 52)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgb(255, 255, 255,.8)",
              borderRadius: "10px",
            },
          }}
        >
          {songs.length === 0 ? (
            <ListItemButton>
              <ListItemText
                primary="No songs found"
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: "medium",
                  textAlign: "center",
                }}
                sx={{
                  minWidth: "300px",
                }}
              />
            </ListItemButton>
          ) : (
            songs.map((song) => (
              <div key={`div-${song.id}`}>
                <ListItemButton
                  key={song.id}
                  sx={{
                    py: 0,
                    minHeight: 75,
                    color: "rgba(255,255,255,.8)",
                  }}
                  onClick={() => handleSongClick(song)}
                >
                  <PlayableAlbumCover
                    img={song.album.images[0].url}
                    url={song.preview_url}
                    size={50}
                    mini={true}
                    albumClickedCallback={handleAlbumClick}
                  />
                  <ListItemText
                    sx={{
                      minWidth: "35%",
                      maxWidth: "35%",
                      margin: "0px 10px",
                      wordWrap: "break-word",
                      overflow: "hidden",
                    }}
                    className="results-list-item-text-name"
                    primary={song.name}
                    secondary={song.artists[0].name}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />

                  <ListItemText
                    sx={{ margin: "0px 20px" }}
                    className="results-list-item-text-album"
                    primary={song.album.name}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                  <LikeButton
                    song={song}
                    favoritedCallback={handleFavoritedCallback}
                  />
                  {user && (
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, song)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </ListItemButton>
                <SongPopupView
                  song={popupSong}
                  isDisplayed={displayPopup}
                  handleClose={handlePopupClose}
                />
              </div>
            ))
          )}
          {user && handleDelete && (
            <>
              <Divider />
              <ListItem component="div" disablePadding>
                <ListItem />
                <IconButton
                  size="small"
                  onClick={() => handleDelete()}
                  sx={{
                    "& svg": {
                      color: "rgba(255,255,255,0.8)",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    pr: "25px",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </>
          )}
        </List>
      </Paper>
      {user && (
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
            user.playlists.map((playlist) => {
              const songInPlaylist = currentSong
                ? playlist.songs.some(
                    (song) => song.spotifyId === currentSong.id
                  )
                : false;

              if (songInPlaylist) {
                // show a background indicating it's already been added
                return (
                  <MenuItem
                    key={playlist._id}
                    onClick={() => addRemoveSongPlaylist(playlist, false)}
                    sx={{ backgroundColor: "primary.main" }}
                  >
                    {playlist.name}
                  </MenuItem>
                );
              } else {
                // show regular background to show it can be added
                return (
                  <MenuItem
                    key={playlist._id}
                    onClick={() => addRemoveSongPlaylist(playlist, true)}
                  >
                    {playlist.name}
                  </MenuItem>
                );
              }
            })}
        </Menu>
      )}
    </Box>
  );
}
