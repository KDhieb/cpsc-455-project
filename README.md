# cpsc-455-project
The main repo for our CPSC 455 project

# Project Progress 1 - Vibesphere

## Project Description:
Vibesphere is a Spotify song recommender application that is aimed at music lovers who want to discover new, but similar music to the songs they already like. It will store user inputed songs, retrieved results from the Spotify API, and recommended songs that will be delivered to our users. Users will be able to like songs, view history of previous songs inputted and share these songs and the recommendations with their friends. Some additional functionality given time constraints, will include public playlists, a user profile, and recommendations based on entire playlists instead of individual songs.

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
- Filter songs by certain metadata
- Leaderboard for most liked songs
- Displaying what songs have been searched globally on homepage

### Stretch Requirements:
- Public playlists -> everyone can create/add to them in the playlist section of app
- Recommending a list of songs based on a playlist of songs
- User authentication/user profiles
- Search API call on each character entered (or wait a few ms or seconds) - prepopulate search results

<img width="1092" alt="home_prototype" src="https://github.com/KDhieb/cpsc-455-project/assets/75541965/08ce75ca-b5b8-479e-a69f-5b3cd86baf0b">
<img width="1110" alt="scoreboard_prototype" src="https://github.com/KDhieb/cpsc-455-project/assets/75541965/81c6d252-2cd0-47f8-8740-78e00a38d212">
