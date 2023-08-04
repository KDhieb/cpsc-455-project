import { developerData } from "../assets/data/developerData";
import AboutUsCard from "../components/AboutUsCard";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export const About = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" style={{ margin: "25px" }}>
        About Vibesphere
      </Typography>
      <Typography variant="body1" align="center">
          Vibesphere is a nifty Spotify song recommender application tailored for music enthusiasts seeking to unearth
          new tracks that mirror their existing preferences. The app, leveraging the Spotify API, stores user-inputted
          songs, generates precise song recommendations, and offers a robust platform to like, play, and share these
          music pieces. With additional features like public playlists, user profiles, and playlist-based
          recommendations, Vibesphere is a haven for music discovery and social sharing.
      </Typography>
      <Typography variant="h4" align="center" style={{ margin: "25px" }}>
        Meet the Developers
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {developerData.map((developer, index) => (
          <AboutUsCard developer={developer} key={index} />
        ))}
      </Box>
    </Container>
  );
};
