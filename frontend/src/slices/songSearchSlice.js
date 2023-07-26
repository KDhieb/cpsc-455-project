import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchSongs = createAsyncThunk(
  "songs/searchSongs",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.get(
        `http://localhost:5001/songs/search/${payload.searchString}`
      );

      return {
        searchString: payload.searchString,
        searchResults: resp.data.tracks.items,
        selectedSongFromSearch: null,
        recommendedSongs: thunkAPI.getState().songSearch.recommendedSongs,
      };
    } catch (error) {
      console.error(error);
      return {
        searchString: payload.searchString,
        searchResults: [],
        selectedSongFromSearch: null,
        recommendedSongs: [],
      };
    }
  }
);

export const fetchRecommendedSongs = createAsyncThunk(
  "songs/fetchRecommendedSongs",
  async (payload, thunkAPI) => {
    try {
      const approx_user_location = Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split("/")[1];

      await axios.post(`http://localhost:5001/songs/globallysearched/add`, {
        song: payload.song,
        location: approx_user_location ?? "Unknown",
      });

      const resp = await axios.post(
        `http://localhost:5001/songs/recommendations/generate`,
        {
          song: payload.song,
        }
      );

      return {
        searchString: thunkAPI.getState().songSearch.searchString,
        searchResults: thunkAPI.getState().songSearch.searchResults,
        selectedSongFromSearch: payload.song,
        recommendedSongs: resp.data.tracks,
      };
    } catch (error) {
      console.error(error);
      return {
        searchString: thunkAPI.getState().songSearch.searchString,
        searchResults: thunkAPI.getState().songSearch.searchResults,
        selectedSongFromSearch: payload.song,
        recommendedSongs: [],
      };
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    searchString: "",
    searchResults: [],
    selectedSongFromSearch: null,
    recommendedSongs: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchSongs.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchRecommendedSongs.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { songs } = songsSlice.actions;
export default songsSlice.reducer;
