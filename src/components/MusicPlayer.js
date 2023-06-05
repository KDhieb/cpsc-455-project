// Component to display playable music button

import "./styles.css";
import { IconButton } from "@mui/material";
import { PlayCircle, PauseCircle } from "@mui/icons-material";
import { useState, useRef } from "react";

export default function MusicPlayer({ url }) {
  const [paused, setPaused] = useState(true);
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

  return (
    <IconButton
      className='music-player-button'
      // todo - fix stylesheet not being picked up
      style={{
        padding: "20px",
        width: "5px",
        height: "5px",
        marginLeft: "62px",
      }}
      onClick={handleClick}
    >
      <audio ref={myRef} src={url} onEnded={handleSongEnded} />
      {paused ? <PlayCircle /> : <PauseCircle />}
    </IconButton>
  );
}
