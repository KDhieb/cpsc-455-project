import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchSongs = createAsyncThunk(
  "songs/searchSongs",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/songs/search/${payload.searchString}`
      );
      return {
        searchString: payload.searchString,
        searchResults: resp.data,
        recommendedSongs: thunkAPI.getState().recommendedSongs,
      };
    } catch (error) {
      console.error(error);
      return {
        searchString: payload.searchString,
        searchResults: [],
        recommendedSongs: thunkAPI.getState().recommendedSongs,
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

      await axios.post(`http://localhost:5000/songs/globallysearched/add`, {
        song: payload.song,
        location: approx_user_location ?? "Unknown",
      });

      const resp = await axios.get(
        `http://localhost:5000/songs/recommendations/generate/${payload.song.id}`
      );

      return {
        searchString: thunkAPI.getState().searchString,
        searchResults: thunkAPI.getState().searchResults,
        recommendedSongs: resp.data,
      };
    } catch (error) {
      console.error(error);
      return {
        searchString: thunkAPI.getState().searchString,
        searchResults: thunkAPI.getState().searchResults,
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
    recommendedSongs: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchSongs.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(fetchRecommendedSongs.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const { songs } = songsSlice.actions;
export default songsSlice.reducer;
