import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  globallySearched: [],
  status: "idle",
  error: null,
};
export const fetchGloballySearchedSongs = createAsyncThunk(
  "songs/globallySearched",
  async (payload, thunkAPI) => {
    try {
      return await axios.get("http://localhost:5001/songs/globallysearched");
    } catch (error) {
      console.error(error);
    }
  }
);

const globallySearchedSlice = createSlice({
  name: "globallySearched",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGloballySearchedSongs.fulfilled, (state, action) => {
      state.globallySearched = action.payload.data.globallySearchedSongs;
      state.status = "succeeded";
      return state;
    });
  },
});

export default globallySearchedSlice.reducer;

export const getGloballySearched = (state) =>
  state.globallySearched.globallySearched;
