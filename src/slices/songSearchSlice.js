import { createSlice } from '@reduxjs/toolkit';

const songSearchSlice = createSlice({
  name: 'songSearch',
  initialState: {
    songName: ""
  },
  reducers: {
    songSearch: (state, action) => {
        console.log('searching song... ' + action.payload);
        state = action.payload;
        return state;
      },
  },
});

export const { songSearch } = songSearchSlice.actions;
export default songSearchSlice.reducer;