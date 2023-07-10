import {
  List,
  ListItemButton,
  ListItemText,
  Box,
  Paper,
  ListSubheader,
} from "@mui/material";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { useRef } from "react";
import LikeButton from "./LikeButton";

export default function SongResults({
  isSearchResults,
  songs,
  handleSongSelect,
  selectedSongFromSearch,
}) {
  // https://mui.com/material-ui/react-list/

  const albumClickedRef = useRef(false);
  const favoritedRef = useRef(false);

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
    <Box display='flex' justifyContent='center' sx={{ mb: 2 }}>
        <Paper
            className='results-container'
            elevation={3}
            sx={{ borderRadius: 2, overflow: "hidden", margin: "10px 10px"}}
        >
            <ListSubheader sx={{ paddingLeft: 3 }}>
                {isSearchResults
                    ? "Search Results"
                    : `Songs similar to: ${selectedSongFromSearch.name} by ${selectedSongFromSearch.artists[0].name}`}
            </ListSubheader>
            <List
                className='results-list'
                sx={{
                    width: "100%",
                    maxWidth: "md",
                    bgcolor: "background.paper",
                    maxHeight: "500px",
                    overflow: "hidden",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                        width: "10px"
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "rgb(5, 30, 52)"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgb(255, 255, 255,.8)",
                        borderRadius: "10px"
                    }
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
              <LikeButton
                song={song}
                favoritedCallback={handleFavoritedCallback}
              />
              {/* <IconButton
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
              </IconButton> */}
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
