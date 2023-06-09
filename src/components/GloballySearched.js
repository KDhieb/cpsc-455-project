import Carousel from "react-material-ui-carousel";
import { Card, Paper, Typography, Container } from "@mui/material";
import { sample_1_songs } from "../sample/sample";
import PlayableAlbumCover from "./PlayableAlbumCover";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useRef } from "react";

const styles = {
  carousel: {
    width: "80%",
    maxWidth: "1000px",
    margin: "auto",
    marginBottom: "50px",
    minYidth: "300px",
  },
  carouselSongGroup: {
    display: "flex",
    justifyContent: "space-around",
  },
  carouselSong: {
    "&:hover": { backgroundColor: "#193044" },
    wordWrap: "normal",
    width: "240px",
    height: "300px",
    alignItems: "left",
    padding: "0px 25px",
    margin: "0px 0px",
    display: "flex",
    flexDirection: "column",
  },
  carouselSongTitle: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: "20px 0px",
  },
  carouselSongArtist: {
    padding: "10px 0px",
    color: "#b5bcc3",
  },
};

export default function GloballySearched() {
  var songs = sample_1_songs.tracks.items;
  const { width } = useWindowDimensions();

  const carouselWidth = Math.min(1000, width * 0.8);

  let songWidth =
    parseInt(styles.carouselSong.padding) * 2 +
    parseInt(styles.carouselSong.width);

  const songsPerGroup = Math.floor(carouselWidth / songWidth);

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
    <div>
      <Typography noWrap={true} align='center' variant='h5' style={{ margin: "25px" }}>
        Songs Searched for Globally
      </Typography>
      <Card sx={styles.carousel} id='carousel'>
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
      </Card>
    </div>
  );
}

function SongGroup({ songs }) {
  return (
    <Paper sx={styles.carouselSongGroup} className='carousel-song-group'>
      {songs.map((song, i) => {
        return <Song key={i} song={song} />;
      })}
    </Paper>
  );
}

function Song({ song }) {
  const albumClickedRef = useRef(false);

  const songClickRedirect = () => {
    if (albumClickedRef.current) {
      albumClickedRef.current = false;
    } else {
      const url = song.external_urls.spotify;
      window.open(url, "_blank", "noreferrer");
    }
  };

  return (
    <Container
      sx={styles.carouselSong}
      className='carousel-song'
      onClick={songClickRedirect}
    >
      <Typography variant='p' sx={styles.carouselSongTitle}>
        {song.name}
      </Typography>
      <Typography variant='p' sx={styles.carouselSongArtist}>
        {song.artists[0].name}
      </Typography>
      <PlayableAlbumCover
        url={song.preview_url}
        img={song.album.images[0].url}
        mini={false}
        albumClickedCallback={() => (albumClickedRef.current = true)}
      />
      <p>{`📍 Canada`}</p>
    </Container>
  );
}
