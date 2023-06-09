import {
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Paper,
  ListSubheader,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { useRef } from "react";
import { Favorite } from "@mui/icons-material";

export default function SongResults({
  isSearchResults,
  songs,
  handleSongSelect,
}) {
  // https://mui.com/material-ui/react-list/

  const albumClickedRef = useRef(false);
  const favoritedRef = useRef(false);

  const handleAlbumClick = () => {
    albumClickedRef.current = true;
  };

  const handleFavorite = (song) => {
    // todo add logic for favorite
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
    <Box display='flex' justifyContent='center'>
      <Paper
        className='results-container'
        elevation={3}
        sx={{ borderRadius: 2, overflow: "hidden", margin: "10px 10px" }}
      >
        <List
          className='results-list'
          sx={{
            width: "100%",
            maxWidth: "md",
            bgcolor: "background.paper",
            maxHeight: "500px",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <ListSubheader sx={{ marginLeft: 2 }}>
            {isSearchResults ? "Search Results" : "You might like . . ."}
          </ListSubheader>

          {songs.map((song) => (
            <ListItemButton
              key={song.id}
              sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
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
                className='results-list-item-text-name'
                primary={song.name}
                secondary={song.artists[0].name}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />

              <ListItemText
                sx={{ margin: "0px 20px" }}
                className='results-list-item-text-album'
                primary={song.album.name}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
              <IconButton
                onClick={(song) => {
                  handleFavorite(song);
                }}
                sx={{ marginLeft: 2 }}
              >
                {favoritedRef.current ? (
                  <Favorite />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
