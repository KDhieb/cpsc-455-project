// Component to display playable music button and album cover

import { IconButton } from "@mui/material";
import { PlayCircle, PauseCircle } from "@mui/icons-material";
import { useState, useRef } from "react";
import "../styling/musicPlayer.css";

// **
// * @param {string} url - url of the song to be played (optional)
// * @param {string} img - url of the image to be displayed
// * @param {boolean} mini - whether the music player should be mini or not
export default function MusicPlayer({ url, img, mini }) {
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
      className={
        mini ? "music-player-container-mini" : "music-player-container"
      }
      onMouseEnter={handleMouseEnterImage}
      onMouseLeave={handleMouseLeaveImage}
    >
      <img
        className={mini ? "album-image-mini" : "album-image"}
        src={img}
        alt='album cover'
      />

      {(buttonVisible || !paused) && url ? (
        <IconButton size='large' onClick={handleClick}>
          <audio ref={myRef} src={url} onEnded={handleSongEnded} />
          {paused ? (
            <PlayCircle fontSize='large' />
          ) : (
            <PauseCircle fontSize='large' />
          )}
        </IconButton>
      ) : // </div>
      null}
    </figure>
  );
}
