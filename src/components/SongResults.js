// Some sections of the code relating to Playlists are attrbuted to help from ChatGPT
import {
  List,
  ListItemButton,
  ListItemText,
  Box,
  Paper,
  ListSubheader,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { useRef, useState } from "react";
import LikeButton from "./LikeButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth0 } from "@auth0/auth0-react";

let playlists = [
  { id: 1, name: "Playlist 1" },
  // add more playlist data
];

export default function SongResults({
  isSearchResults,
  songs,
  handleSongSelect,
  selectedSongFromSearch,
}) {
  // https://mui.com/material-ui/react-list/

  const albumClickedRef = useRef(false);
  const favoritedRef = useRef(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const { isAuthenticated } = useAuth0();

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

  const addToPlaylist = (playlist) => {
    console.log(`Adding song ${currentSong.name} to playlist ${playlist.name}`);
    handleClose();
  };

  const handleCreatePlaylist = () => {
    setCreatingPlaylist(true);
  };

  const handleSavePlaylist = () => {
    if (newPlaylistName) {
      const newPlaylist = { id: playlists.length + 1, name: newPlaylistName };
      playlists.push(newPlaylist);
      console.log(`Created new playlist: ${newPlaylist.name}`);
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
      handleSongSelect(song);
    }
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
      <Paper
        className="results-container"
        elevation={3}
        sx={{ borderRadius: 2, overflow: "hidden", margin: "10px 10px" }}
      >
        <ListSubheader sx={{ paddingLeft: 3 }}>
          {isSearchResults
            ? "Search Results"
            : `Songs similar to: ${selectedSongFromSearch.name} by ${selectedSongFromSearch.artists[0].name}`}
        </ListSubheader>
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
          {songs.map((song) => (
            <ListItemButton
              key={song.id}
              sx={{ py: 0, minHeight: 75, color: "rgba(255,255,255,.8)" }}
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
              {isAuthenticated && (
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
          ))}
        </List>
      </Paper>
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
        <MenuItem onClick={handleCreatePlaylist}>Create new playlist</MenuItem>
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
          playlists.map((playlist) => (
            <MenuItem key={playlist.id} onClick={() => addToPlaylist(playlist)}>
              {playlist.name}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
}
