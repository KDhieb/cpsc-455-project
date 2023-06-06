// Component to display playable music button and album cover

import { IconButton } from "@mui/material";
import { PlayCircle, PauseCircle } from "@mui/icons-material";
import { useState, useRef } from "react";
import "../styling/musicPlayer.css";

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
}) {
  const [paused, setPaused] = useState(true);
  const [buttonVisible, setButtonVisibility] = useState(false);

  const myRef = useRef();

  const handleClick = () => {
    setPaused(!paused);
    if (paused) {
      myRef.current.play();
    } else {
      myRef.current.pause();
    }
  };

  const handleSongEnded = () => {
    setPaused(!paused);
  };

  const handleMouseEnterImage = () => {
    setButtonVisibility(true);
  };

  const handleMouseLeaveImage = () => {
    setButtonVisibility(false);
  };

  return (
    <figure
      style={{ width: size, height: size }}
      className={
        mini ? "music-player-container-mini" : "music-player-container"
      }
      onMouseEnter={handleMouseEnterImage}
      onMouseLeave={handleMouseLeaveImage}
    >
      <img
        style={{ width: size, height: size }}
        className={mini ? "album-image-mini" : "album-image"}
        src={img}
        alt='album cover'
      />

      {(buttonVisible || !paused) && url ? (
        <IconButton size={mini ? "small" : "large"} onClick={handleClick}>
          <audio ref={myRef} src={url} onEnded={handleSongEnded} />
          {paused ? (
            <PlayCircle fontSize={mini ? "small" : "large"} />
          ) : (
            <PauseCircle fontSize={mini ? "small" : "large"} />
          )}
        </IconButton>
      ) : // </div>
      null}
    </figure>
  );
}
