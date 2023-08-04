import { createSlice } from "@reduxjs/toolkit";

const playableAlbumCoverSlice = createSlice({
  name: "playableAlbumCover",
  initialState: {
    ref: null,
    callback: null,
  },
  reducers: {
    getState: (state) => {
      return {
        ref: state.ref,
        callback: state.callback,
      };
    },
    clearState: () => {
      return {
        ref: null,
        callback: null,
      };
    },
    playSong: (state, action) => {
      if (state.ref !== null && state.ref !== undefined) {
        if (state.ref !== action.payload.ref) {
          state.ref.pause();
          state.callback();
        }
      }
      action.payload.ref.play();
      return {
        ref: action.payload.ref,
        callback: action.payload.callback,
      };
    },
    pauseSong: (state) => {
      if (state.ref !== null && state.ref !== undefined) {
        state.ref.pause();
      }
      return {
        ref: null,
        callback: null,
      };
    },
  },
});

export const { playSong, pauseSong, getState, clearState } =
  playableAlbumCoverSlice.actions;
export default playableAlbumCoverSlice.reducer;
