import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateLikes = createAsyncThunk(
  "likes/updateLikes",
  async (payload, thunkAPI) => {
    const song = payload.song;
    const isLiked = payload.isLiked;

    const state = thunkAPI.getState().likes;
    const songsLiked = { ...state.songsLiked };
    songsLiked[song.id] = isLiked;

    await axios.put(
      `https://cpsc455-jkrap-backend.onrender.com/songs/likes/update`,
      {
        song: song,
        isLiked: payload.isLiked,
      }
    );

    return {
      songsLiked: songsLiked,
    };
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    songsLiked: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateLikes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default likesSlice.reducer;
