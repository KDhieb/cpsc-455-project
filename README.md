# cpsc-455-project
The main repo for our CPSC 455 project

Group Members: Amy Chen, Jerome Ting, Khalid Dhieb, Parmvir Shergill, Richard Chen

# Project Progress 1 - Vibesphere

## Project Description:
Vibesphere is a nifty Spotify song recommender application tailored for music enthusiasts seeking to unearth new tracks that mirror their existing preferences. The app, leveraging the Spotify API, stores user-inputted songs, generates precise song recommendations, and offers a robust platform to like, play, and share these music pieces. With additional features like public playlists, user profiles, and playlist-based recommendations, Vibesphere is a haven for music discovery and social sharing.

## Project Task Requirements:
### Minimal Requirements:
- Search a song in Spotify API
  - Basic input textbook/form
  - API call to Spotify backend to get the user's song in the form of Spotify results
- Return a list of songs from Spotify API matching search
  - Show a list of songs that match entered characters
  - Should be able to select one of those songs
- Navigate site
  - React router setup
  - Homepage, About, Scoreboard

### Standard Requirements:
- Recommending a list of songs similar to a single user inputted song
- Liking/favouriting songs
- User can play a preview of the song
- Leaderboard for most liked songs
- Displaying what songs have been searched globally on homepage

### Stretch Requirements:
- Public playlists -> everyone can create/add to them in the playlist section of app
- Recommending a list of songs based on a playlist of songs
- User authentication/user profiles
- Search API call on each character entered (or wait a few ms or seconds) - prepopulate search results

<img width="1136" alt="home_prototype" src="https://github.com/KDhieb/cpsc-455-project/assets/75541965/295cd341-b8d5-474f-9a48-ccd621ca1279">
<img width="1110" alt="scoreboard_prototype" src="https://github.com/KDhieb/cpsc-455-project/assets/75541965/3953286f-94a4-4b10-af6b-d6088a7dbb04">
