import { createSlice } from "@reduxjs/toolkit";

const playableAlbumCoverSlice = createSlice({
  name: "playableAlbumCover",
  initialState: {
    ref: null,
    callback: null,
  },
  reducers: {
    checkForPlayingSong: (state, action) => {
      if (state.ref !== null && state.ref !== undefined) {
        if (state.ref !== action.payload.ref) {
          state.ref.pause();
          state.callback();
        }
      }
      return { ref: action.payload.ref, callback: action.payload.callback };
    },
    getPlayingSongRef: (state, action) => {
      return { ref: state.ref, callback: state.callback };
    },
  },
});

export const { checkForPlayingSong, getPlayingSongRef } =
  playableAlbumCoverSlice.actions;
export default playableAlbumCoverSlice.reducer;
