import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import sampleSongs from "../sample/sample";

export default function GloballySearched({ songsPerGroup }) {
  var songs = sampleSongs.tracks.items;

  const nGroups = Math.floor(songs.length / 3);

  const songGroups = [];

  for (let i = 0; i < nGroups; i++) {
    songGroups.push([]);
    for (let j = i * songsPerGroup; j < (i + 1) * songsPerGroup; j++) {
      if (j < songs.length) {
        songGroups[i].push(songs[j]);
      }
    }
  }

  return (
    <div className='carousel-container'>
      <h3 className='carousel-title'>Songs Searched for Globally</h3>
      <div id='carousel'>
        <Carousel
          animation='slide'
          indicators={false}
          duration={500}
          autoPlay={true}
        >
          {songGroups.map((group, i) => {
            return <SongGroup key={i} songs={group} />;
          })}
          {}
        </Carousel>
      </div>
    </div>
  );
}

function SongGroup({ songs }) {
  return (
    <Paper className='carousel-song-group'>
      {songs.map((song, i) => {
        return <Song key={i} song={song} />;
      })}
    </Paper>
  );
}

function Song({ song }) {
  const songClickRedirect = () => {
    // const url = song.external_urls.spotify;
    // window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className='carousel-song' onClick={songClickRedirect}>
      <p className='carousel-song-title'>{song.name}</p>
      <p className='carousel-song-artist'>{song.artists[0].name}</p>
      <img
        className='carousel-image'
        src={song.album.images[0].url}
        alt='album cover'
      />
      <MusicPlayer url={song.preview_url} />
      {/* ADD LOCATION */}
      <p>{`📍 Canada`}</p>
    </div>
  );
}
