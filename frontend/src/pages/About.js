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
        Vibesphere is a Spotify song recommender application that is aimed at
        music lovers who want to discover new, but similar music to the songs
        they already like. It will store user inputted songs, retrieve results
        from the Spotify API, and recommend songs that will be delivered to our
        users. Users will be able to like songs, view history of previous songs
        inputted, then share these songs and the recommendations with their
        friends. Some additional functionality, given time constraints, will
        include: public playlists, a user profile, and recommendations based on
        entire playlists instead of individual songs.
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
