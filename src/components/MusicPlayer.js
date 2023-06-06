// Component to display playable music button

import { IconButton } from "@mui/material";
import { PlayCircle, PauseCircle } from "@mui/icons-material";
import { useState, useRef } from "react";
import "../styling/musicPlayer.css";

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
      onMouseEnter={handleMouseEnterImage}
      onMouseLeave={handleMouseLeaveImage}
    >
      <img className='carousel-image' src={img} alt='album cover' />

      {buttonVisible || !paused ? (
        <div className={"music-player-container"}>
          <IconButton size='large' onClick={handleClick}>
            <audio ref={myRef} src={url} onEnded={handleSongEnded} />
            {paused ? (
              <PlayCircle fontSize='large' />
            ) : (
              <PauseCircle fontSize='large' />
            )}
          </IconButton>
        </div>
      ) : null}
    </figure>
  );
}
