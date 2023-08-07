import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Slider from "@mui/material/Slider";
import { useRef, useState } from "react";
import { Container, Grid, Stack, styled } from "@mui/material";
import { darkTheme } from "../styling/theme";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { Link } from "react-router-dom";

// based on https://mui.com/material-ui/react-card/ control UI card example
export default function AboutUsCard({ developer }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const albumClickedRef = useRef(false);
  const maxIndex = 2;
  const minIndex = 0;

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === maxIndex ? prevIndex : prevIndex + 1
    );
  };

  const handlePreviousSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === minIndex ? prevIndex : prevIndex - 1
    );
  };

  const openPopup = (url) => {
    window.open(url, "_blank");
  };
  const handleLinkClick = (event) => {
    event.preventDefault();

    openPopup(event.currentTarget.href);
  };

  const handleAlbumClicked = () => {
    albumClickedRef.current = true;
  };

  const CustomSlider = styled(Slider)(({ theme }) => ({
    width: "80%",
    color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
    pointerEvents: "none",
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      display: "none",
    },
  }));

  return (
    <Container
      sx={{ padding: "5px", width: "310px" }}
      disableGutters
      maxWidth={false}
    >
      <Card
        sx={{ display: "flex", background: "darkgray", width: "fit-content" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{ flex: "1 0 auto", width: "117px", height: "80px" }}
          >
            <Typography component="div" variant="h5">
              {slideIndex === 0 && <Typography>About Me</Typography>}
              {slideIndex === 1 && <Typography>Song Recommendation</Typography>}
              {slideIndex === 2 && <Typography>Linkedin</Typography>}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {developer.name}
            </Typography>
          </CardContent>
          <CustomSlider
            value={slideIndex}
            min={minIndex}
            max={maxIndex} // Adjust the maximum value based on the number of slides
            step={1}
          />
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous" onClick={handlePreviousSlide}>
              {darkTheme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause" onClick={handleNextSlide}>
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next" onClick={handleNextSlide}>
              {darkTheme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={developer.img}
          alt="placeholder developer cover"
        />
      </Card>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          padding: "10px",
          height: 150,
        }}
      >
        {slideIndex === 0 && <Typography>{developer.description}</Typography>}
        {slideIndex === 1 && (
          <Grid container justify="center" alignItems="center">
            <Grid
              item={true}
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayableAlbumCover
                url={developer.song.previewURL}
                img={developer.song.albumCover}
                mini={false}
                size={110}
                albumClickedCallback={handleAlbumClicked}
              />
            </Grid>
            <Grid
              item={true}
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Stack direction="column">
                <Typography>{developer.song.songName}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {developer.song.songArtist}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}
        {slideIndex === 2 && (
          <Box
            sx={{
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              href="#"
              to={developer.linkedin}
              style={{ color: "white" }}
              onClick={handleLinkClick}
            >
              Learn more about me
            </Link>
          </Box>
        )}
      </Card>
    </Container>
  );
}
