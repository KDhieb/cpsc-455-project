import { useDispatch } from "react-redux";

import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

import sampleSongs from "../sample/sample";

export default function GloballySearched() {
  var songs = sampleSongs.tracks.items;

  return (
    <div id='carousel'>
      <Carousel animation='slide' indicators={true} duration={500}>
        {songs.map((song, i) => (
          <Song key={i} song={song} />
        ))}
      </Carousel>
    </div>
  );
}

function Song({ song }) {
  return (
    <Paper>
      <h2>{song.name}</h2>
      <img src={song.img} />
      <p>{`Pin Icon - ${song.location}`}</p>

      {/* <Button className='song-button'></Button> */}
    </Paper>
  );
}
