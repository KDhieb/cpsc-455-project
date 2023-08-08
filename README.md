# Vibesphere

## Project Description:
Vibesphere is a nifty Spotify song recommender application tailored for music enthusiasts seeking to unearth new tracks that mirror their existing preferences. The app, leveraging the Spotify API, stores user-inputted songs, generates precise song recommendations, and offers a robust platform to like, play, and share these music pieces. With additional features like public playlists, user profiles, and playlist-based recommendations, Vibesphere is a haven for music discovery and social sharing.

_Group Members: Amy Chen, Jerome Ting, Khalid Dhieb, Parmvir Shergill, Richard Chen_

## Statement of Goals:
### Minimal Requirements:
- [x] Search a song in Spotify API
  - Basic input textbook/form
  - API call to Spotify backend to get the user's song in the form of Spotify results
- [x] Return a list of songs from Spotify API matching search
  - Show a list of songs that match entered characters
  - Should be able to select one of those songs
- [x] Navigate site
  - React router setup
  - Homepage, About, Scoreboard

### Standard Requirements:
- [x] Recommending a list of songs similar to a single user inputted song
- [x] Liking/favouriting songs
- [x] User can play a preview of the song
- [x] Leaderboard for most liked songs
- [x] Displaying what songs have been searched globally on homepage

### Stretch Requirements:
- [x] Public playlists -> everyone can create/add to them in the playlist section of app
- [ ] Recommending a list of songs based on a playlist of songs
- [x] User authentication/user profiles
- [x] Search API call on each character entered (or wait a few ms or seconds) - prepopulate search results


## Utilizes Technology

**HTML, CSS, JS**

Vibesphere leverages React to generate HTML content, utilizing JavaScript components that interact with the DOM. Our project adopts CSS through the renowned Material UI framework. With the help of 'sx props', CSS in JS, we apply styles across various components without traditional CSS, facilitating efficient global theme management. Given that React is fundamentally JavaScript, we extensively use JavaScript in both our frontend and NodeJS/Express backend.

**React & Redux**

Vibesphere's prime objective is to deliver high-quality, user-specific song recommendations, which is facilitated by React's capabilities to create a single page application with logically segregated components like our song search and song results box. Redux plays a critical role in maintaining a global state that serves as a single source of truth. It contains the data related to songs, their corresponding recommendations, and user playlists from our backend.

**Node & Express**

Node & Express are pivotal to Vibesphere's communication with our MongoDB database, serving as a REST API for storing and retrieving songs and playlists. It also functions as a gateway to the Spotify API, sparing users the need for Spotify account authentication and facilitating the retrieval of song recommendations from our secondary backend—a Python Flask machine learning server.

**MongoDB**

As Vibesphere doubles as a social application, we employ a MongoDB NoSQL backend to track user-created playlists and saved songs. It also keeps a record of globally searched songs and tracks the most popular songs liked by users.

**Deployment**

Vibesphere is deployed on Render, segmented into three parts—the frontend website, accessible at https://vibesphere.onrender.com/, and our two backend servers—NodeJS & Express and Flask, respectively, also hosted on Render.

## Above and Beyond

Vibesphere incorporates a custom machine learning algorithm for its recommendation system, utilizing the power of both K-means clustering and K-nearest neighbors (KNN). The model is trained on a dataset of approximately 175,000 tracks, which we preprocess. To determine the optimal number of clusters (k) for our system, we employ two techniques: the elbow method and the silhouette method. These methods help us strike the right balance between model complexity and data fit.

Our algorithm starts by employing K-means to organize the data into clusters, enabling efficient grouping of similar songs. Subsequently, KNN comes into play, using Euclidean distance to identify the nearest songs to the user's input track. This ensures that we recommend songs that closely match the user's preferences. One of the key reasons for adopting this approach is the paramount importance of response time for a seamless user experience. By reducing the search space through clustering, we achieve significant speed gains in our recommendation system. Additionally, this method offers excellent scalability, making it suitable for large-scale deployments.

Furthermore, our approach addresses the cold start problem, enabling the application to provide valuable recommendations even when we have limited prior knowledge about the user's preferences.

## Next Steps
To further improve our application, we can refine our machine learning search recommendation algorithm even more by using a larger quantity of training data, and allowing the user to rate it with "thumbs up" or "thumbs down" via a modal to improve the algorithm, explore further feature engineering for our model, or incorporating more complicated machine learning models such as neural networks. 

Another potential addition is to introduce an ability to recommend songs based on an existing playlist of songs, as it may provide a more accurate overall recommendation. We can also enhance the social aspect of the website by adding a chat feature to the site, or allow users to add comments on songs.

## List of Contributions
Khalid worked on establishing the foundations of the backend server, and connected it to our front-end. He completed the searchbar functionality, hooked it up to the Spotify API, and added the Skeleton loading animations to the search. Additionally, he created the GloballySearched carousel, PlayableAlbumCover component to preview songs, and the Song modal popup reused on multiple pages for when the user wishes to view more song details. 

Jerome worked on establishing the foundations of the frontend, with page navigation, and laying out designs of the pages. He removed redundancies in code styling by identifying similarities and consolidating MUI themes between pages. Jerome also worked on improving the Machine Learning algorithm, and implementing the logic to connect Spotify API data into the GloballySearched carousel. 

Parmvir worked on creating the Scoreboard functionality of the application, ensuring it has proper pagination, and integrated the Song Popup modal for each song in the Scoreboard table. He set up the initial MongoDB database that our application is connected to. Parmvir also created the MongoDB schema, and corresponding backend endpoints to represent Liked songs on the Scoreboard.

Richard worked on researching and implementing the Machine Learning server on Flask for our song recommendation algorithm, using a Kmeans and Knn model. Richard also set up the user authentication aspect of the application using Auth0, allowing the user to sign in and out to access playlists. He also worked on all of the user playlist functionality, allowing the user to create, read, update, delete, and share playlists, by creating new Playlist, Songs, and User schemas in MongoDB.

Amy worked on integrating the GloballySearched carousel with a database, by storing the searched songs in a new MongoDB schema. She also deployed the application on Render, making code adjustments to accomodate new environment variables for when the user in dev and prod environments. Amy also fixed production issues with Auth0 tokens, added the Song Popup modal to the Playlist page.

## Site Mockups 
<img width="1136" alt="home_prototype" src="https://github.com/KDhieb/cpsc-455-project/assets/75541965/295cd341-b8d5-474f-9a48-ccd621ca1279">
<img width="1110" alt="scoreboard_prototype" src="https://github.com/KDhieb/cpsc-455-project/assets/75541965/3953286f-94a4-4b10-af6b-d6088a7dbb04">
