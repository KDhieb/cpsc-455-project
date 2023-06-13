import { configureStore } from "@reduxjs/toolkit";
import songSearchReducer from "./slices/songSearchSlice";
import recommendedSongsReducer from "./slices/recommendedSongsSlice";
import playableAlbumCoverReducer from "./slices/PlayableAlbumCoverSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import likesReducer from "./slices/likesSlice";

const store = configureStore({
  reducer: {
    songSearch: songSearchReducer,
    recommendedSongs: recommendedSongsReducer,
    playableAlbumCover: playableAlbumCoverReducer,
    likes: likesReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
