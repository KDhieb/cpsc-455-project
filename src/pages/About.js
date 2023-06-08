import { developerData } from "../assets/data/developerData";
import AboutUsCard from "../components/AboutUsCard";
import {Container} from "@mui/material";
import {Typography} from "@material-ui/core";
import Box from "@mui/material/Box";

export const About = () => {
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center">
                About Vibesphere
            </Typography>
            <Typography variant="body1" align="center">
                Vibesphere is a Spotify song recommender application that is aimed at music lovers who want to discover new, but similar music to the songs they already like. It will store user inputted songs, retrieve results from the Spotify API, and recommend songs that will be delivered to our users. Users will be able to like songs, view history of previous songs inputted, then share these songs and the recommendations with their friends. Some additional functionality, given time constraints, will include: public playlists, a user profile, and recommendations based on entire playlists instead of individual songs.
            </Typography>
            <Typography variant="h4" align="center">
                Meet the Developers
            </Typography>
            <Box sx={{
                display:"flex",
                flexDirection: 'row',
                flexWrap: "wrap",
                // width: "fit-content",
                // marginLeft: "auto",
                // marginRight: "auto"
            }}>
                {developerData.map((developer, index) => (
                    <AboutUsCard developer={developer} key={index}/>
                ))}
            </Box>
        </Container>
    )
};
