import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signinUser = createAsyncThunk(
  "user/signin",
  async (payload, thunkAPI) => {
    try {
      const token = await payload.getAccessTokenWithPopup({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: "read:posts",
        },
      });
      const data = {
        email: payload.user.email,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `http://localhost:5001/users/signin`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Create user playlist - add playlist id response to state array

// Add song to playlist - POST song first, then take playlist id from menu and song id from POST's response and PUT to "/:playlistId"

// Remove song from playlist - send spotify ID in body and delete matching from playlist

// Delete user playlist

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: "idle", error: null },
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signinUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
