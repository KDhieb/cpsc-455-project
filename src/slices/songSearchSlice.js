import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchSongs = createAsyncThunk(
  "songs/searchSongs",
  async (payload, thunkAPI) => {
    try {
      console.log(payload.searchString);
      const resp = await axios.get(
        `http://localhost:5000/songs/search/${payload.searchString}`
      );
      return {
        searchString: payload.searchString,
        results: resp.data,
      };
    } catch (error) {
      console.error(error);
      return { searchString: payload.searchString, results: [] };
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    searchString: "",
    results: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchSongs.fulfilled, (state, action) => {
      console.log("fetchSongs.fulfilled");
      console.log(action.payload);
      state = action.payload;
    });
  },
});

export const { songs } = songsSlice.actions;
export default songsSlice.reducer;
