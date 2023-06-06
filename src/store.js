import { configureStore } from "@reduxjs/toolkit";
import songSearchReducer from "./slices/songSearchSlice";
import recommendedSongsReducer from "./slices/recommendedSongsSlice";

const store = configureStore({
  reducer: {
    songSearch: songSearchReducer,
    recommendedSongs: recommendedSongsReducer,
    // add reducers here
  },
});

export default store;
