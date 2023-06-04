import AboutUsCard from "../AboutUsCard";

export const About = () => {
    const developers = [
        {
            name: "Amy Chen",
            title: "",
            img: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=500w",
            description: "description for Amy",
            linkedin: "linkedin-url-for-amy"
        },
        {
            name: "Jerome Ting",
            title: "",
            img: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=500w",
            description: "description for Jerome",
            linkedin: "linkedin-url-for-jerome"
        },
        {
            name: "Khalid Dhieb",
            title: "",
            img: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=500w",
            description: "description for Khalid",
            linkedin: "linkedin-url-for-khalid"
        },
        {
            name: "Parmvir Shergill",
            title: "",
            img: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=500w",
            description: "description for Parmvir",
            linkedin: "linkedin-url-for-parmvir"
        },
        {
            name: "Richard Chen",
            title: "",
            img: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=500w",
            description: "description for Richard",
            linkedin: "linkedin-url-for-richard"
        },
    ]

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
                {developers.map((developer) => (
                    <AboutUsCard developer={developer}/>
                ))}
            </div>
        </div>
    )
};
