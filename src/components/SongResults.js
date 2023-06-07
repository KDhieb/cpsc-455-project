import {
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Paper,
  ListSubheader,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useSelector } from "react-redux";
import PlayableAlbumCover from "./PlayableAlbumCover";
import "../styling/songResultList.css";
import { useState } from "react";

export default function SongResults({
  isSearchResults,
  songs,
  handleSongSelect,
}) {
  // https://mui.com/material-ui/react-list/
  // https://codesandbox.io/s/nd1qej?file=/demo.js:1912-1922
  // const songs = useSelector((state) => state.recommendedSongs.current);
  // const [isSearchResults, setIsSearchResults] = useState(true);

  const [albumClicked, setAlbumClicked] = useState(false);

  const handleAlbumClick = () => {
    setAlbumClicked(true);
  };

  const handleSongClick = (song) => {
    if (albumClicked) {
      setAlbumClicked(false);
      setTimeout(() => {}, 0);
    } else if (isSearchResults) {
      handleSongSelect(song); // or maybe use redux?
      // pass song into ML pipeline
    } else {
      alert("This is a recommended song: " + song.name);
      // do something else
    }
  };

  return (
    <Box display='flex' justifyContent='center'>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper
          className='results-container'
          elevation={3}
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <List
            className='results-list'
            sx={{ width: "100%", maxWidth: "md", bgcolor: "background.paper" }}
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
                  className='results-list-item-text-name'
                  primary={song.name}
                  secondary={song.artists[0].name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />

                <ListItemText
                  className='results-list-item-text-album'
                  primary={song.album.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
                <IconButton
                  onClick={() => console.log("clicked favourite")}
                  sx={{ marginLeft: 2 }}
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
