import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var backend_url = process.env.REACT_APP_BACKEND_SERVER;

const initialState = {
  globallySearched: [],
  status: "idle",
  error: null,
};
export const fetchGloballySearchedSongs = createAsyncThunk(
  "songs/globallySearched",
  async (payload, thunkAPI) => {
    try {
      return await axios.get(backend_url + "/songs/globallysearched");
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
