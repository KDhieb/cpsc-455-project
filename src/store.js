import { configureStore } from "@reduxjs/toolkit";
import songSearchReducer from "./slices/songSearchSlice";
import playableAlbumCoverReducer from "./slices/PlayableAlbumCoverSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    songSearch: songSearchReducer,
    playableAlbumCover: playableAlbumCoverReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
