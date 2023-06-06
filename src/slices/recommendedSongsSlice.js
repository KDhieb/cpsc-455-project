import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // current - represents the current recommended songs based off the last user submission to the recommender system
  current: [
    {
      id: "id1",
      imageUrl: "https://dummyimage.com/50",
      songName: "SongName1",
      artistName: "ArtistName1",
    },
    {
      id: "id2",
      imageUrl: "https://dummyimage.com/50",
      songName: "SongName2",
      artistName: "ArtistName2",
    },
  ],
  // historical - represents all the songs that have ever been recommended by the system in the current session
  historical: [
    {
      id: "id1",
      imageUrl: "https://dummyimage.com/50",
      songName: "SongName1",
      artistName: "ArtistName1",
    },
    {
      id: "id2",
      imageUrl: "https://dummyimage.com/50",
      songName: "SongName2",
      artistName: "ArtistName2",
    },
  ],
};

const recommendedSongSlice = createSlice({
  name: "recommendedSongs",
  initialState,
  reducers: {
    recommendSongs: (state, action) => {
      // this action expects a LIST of song objects as the payload
      state.current = action.payload;
      state.historical.concat(action.payload);
    },
  },
});

export const { addItem } = recommendedSongSlice.actions;
export default recommendedSongSlice.reducer;
