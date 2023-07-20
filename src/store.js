import { configureStore } from "@reduxjs/toolkit";
import songSearchReducer from "./slices/songSearchSlice";
import playableAlbumCoverReducer from "./slices/PlayableAlbumCoverSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import likesReducer from "./slices/likesSlice";
import globallySearchedReducer from "./slices/globallySearchedSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    songSearch: songSearchReducer,
    playableAlbumCover: playableAlbumCoverReducer,
    likes: likesReducer,
    globallySearched: globallySearchedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
