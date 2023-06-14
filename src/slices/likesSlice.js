import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateLikes = createAsyncThunk(
  "likes/updateLikes",
  async (payload, thunkAPI) => {
    const songId = payload.songId;
    const isLiked = payload.isLiked;

    const state = thunkAPI.getState().likes;
    const songsLiked = { ...state.songsLiked };
    songsLiked[songId] = isLiked;

    await axios.put(`http://localhost:5000/songs/likes/update`, {
      songId: songId,
      isLiked: payload.isLiked,
    });

    return {
      songsLiked: songsLiked,
      currentSongId: songId,
      currentSongLiked: isLiked,
    };
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    songsLiked: {},
    currentSongId: null,
    currentSongLiked: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateLikes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default likesSlice.reducer;
