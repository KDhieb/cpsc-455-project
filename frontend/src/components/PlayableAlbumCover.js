// Component to display playable music button and album cover
import { Box, IconButton } from "@mui/material";
import { PlayCircle, PauseCircle } from "@mui/icons-material";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  playSong,
  pauseSong,
  clearState,
} from "../slices/PlayableAlbumCoverSlice";

const styles = {
  container: {
    position: "relative",
    margin: "0 0",
    padding: "0 0",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: "green",
    backgroundColor: "white",
    "&:hover": { backgroundColor: "white" },
  },
};

// **
// * @param {string} url - url of the song to be played (optional)
// * @param {string} img - url of the image to be displayed
// * @param {boolean} mini - size of the button - true for mini, false for large
// * @param {number} size - width/height of the album cover
export default function PlayableAlbumCover({
  url,
  img,
  mini = false,
  size = 150,
  albumClickedCallback = () => {},
}) {
  const [paused, setPaused] = useState(true);
  const [buttonVisible, setButtonVisibility] = useState(false);

  const myRef = useRef();
  const dispatch = useDispatch();

  const handleClick = () => {
    albumClickedCallback();
    setPaused(!paused);
    if (paused) {
      dispatch(
        playSong({
          ref: myRef.current,
          callback: () => {
            setPaused(true);
          },
        })
      );
    } else {
      dispatch(pauseSong());
    }
  };

  const handleSongEnded = () => {
    dispatch(clearState());
    setPaused(!paused);
  };

  const handleMouseEnterImage = () => {
    setButtonVisibility(true);
  };

  const handleMouseLeaveImage = () => {
    setButtonVisibility(false);
  };

  return (
    <Box
      sx={{
        ...styles.container,
        width: size,
        height: size,
      }}
      onMouseEnter={handleMouseEnterImage}
      onMouseLeave={handleMouseLeaveImage}
    >
      <Box
        alt="album cover"
        src={img}
        component="img"
        sx={{ width: size, height: size, margin: "0 0" }}
      />
      {(buttonVisible || !paused) && url ? (
        <IconButton
          sx={styles.playButton}
          size={mini ? "small" : "large"}
          onClick={handleClick}
        >
          <audio ref={myRef} src={url} onEnded={handleSongEnded} />
          {paused ? (
            <PlayCircle fontSize={mini ? "small" : "large"} />
          ) : (
            <PauseCircle fontSize={mini ? "small" : "large"} />
          )}
        </IconButton>
      ) : null}
    </Box>
  );
}
