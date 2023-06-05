import { developerData } from "../assets/data/developerData";
import AboutUsCard from "../components/AboutUsCard";
import "../styling/about.css";

export const About = () => {
    return (
        <div className="about">
            <h1 className='about-us-headers'>
                About Vibesphere
            </h1>
            <p id="vibe-sphere-description">
                Vibesphere is a Spotify song recommender application that is aimed at music lovers who want to discover new, but similar music to the songs they already like. It will store user inputted songs, retrieve results from the Spotify API, and recommend songs that will be delivered to our users. Users will be able to like songs, view history of previous songs inputted, then share these songs and the recommendations with their friends. Some additional functionality, given time constraints, will include: public playlists, a user profile, and recommendations based on entire playlists instead of individual songs.
            </p>
            <h1 className='about-us-headers'>
                Meet the Developers
            </h1>
            <div className="about-us-card-container">
                {developerData.map((developer, index) => (
                    <AboutUsCard developer={developer} key={index}/>
                ))}
            </div>
        </div>
    )
};
