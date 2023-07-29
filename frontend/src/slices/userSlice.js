import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var backend_url = process.env.REACT_APP_BACKEND_SERVER;
let token_type = process.env.REACT_APP_AUTH0_TOKEN_TYPE;

export const signinUser = createAsyncThunk(
  "user/signin",
  async (payload, thunkAPI) => {
    try {
      let token;
      if (token_type === "getAccessTokenWithPopup") {
        token = await payload.getAccessTokenWithPopup({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      } else {
        token = await payload.getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      }
      const data = {
        email: payload.user.email,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(backend_url + `/users/signin`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Create user playlist - add playlist id response to state array
export const createUserPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async (payload, thunkAPI) => {
    try {
      const { email, playlistName, getAccessTokenSilently, getAccessTokenWithPopup } = payload;
      let token;
      if (token_type === "getAccessTokenWithPopup") {
        token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      } else {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      }

      const createPlaylistData = {
        name: playlistName,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const createPlaylistResponse = await axios.post(
        backend_url + `/playlists`,
        createPlaylistData,
        { headers }
      );

      const playlistId = createPlaylistResponse.data._id;
      const addPlaylistToUserData = {
        playlistId: playlistId,
      };

      const response = await axios.post(
        backend_url + `/users/${email}/playlists`,
        addPlaylistToUserData,
        { headers }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Add song to playlist - POST song first, then take playlist id from menu and song id from POST's response and PUT to "/:playlistId"
export const addSongToPlaylist = createAsyncThunk(
  "user/addSongToPlaylist",
  async (payload, thunkAPI) => {
    try {
      const { playlistId, songData, getAccessTokenSilently, getAccessTokenWithPopup } = payload;
      let token;
      if (token_type === "getAccessTokenWithPopup") {
        token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      } else {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // POST song
      const songResponse = await axios.post(backend_url + `/songs`, songData, {
        headers,
      });

      // POST to "/:playlistId"
      const response = await axios.post(
        backend_url + `/playlists/${playlistId}`,
        { songId: songResponse.data._id },
        { headers }
      );
      const songWithPlaylistId = { ...response.data, playlistId };
      return songWithPlaylistId;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Remove song from playlist - send spotify ID in body and delete matching from playlist
export const removeSongFromPlaylist = createAsyncThunk(
  "user/removeSongFromPlaylist",
  async (payload, thunkAPI) => {
    try {
      const { playlistId, spotifyId, getAccessTokenSilently, getAccessTokenWithPopup } = payload;
      let token;
      if (token_type === "getAccessTokenWithPopup") {
        token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      } else {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(backend_url + `/playlists/${playlistId}/songs`, {
        data: { spotifyId },
        headers,
      });
      const ids = { playlistId, spotifyId };
      return ids;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Delete user playlist
export const deleteUserPlaylist = createAsyncThunk(
  "user/deleteUserPlaylist",
  async (payload, thunkAPI) => {
    try {
      const { email, playlistId, playlistName, getAccessTokenSilently, getAccessTokenWithPopup } = payload;
      let token;
      if (token_type === "getAccessTokenWithPopup") {
        token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: "read:posts",
        },
      });
      } else {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:posts",
          },
        });
      }
      
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(backend_url + `/users/${email}/playlists`, {
        data: { playlistId, playlistName },
        headers,
      });
      return playlistId;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

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
      })
      .addCase(createUserPlaylist.fulfilled, (state, action) => {
        state.user.playlists.push(action.payload);
      })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        const { playlistId, ...songWithoutPlaylistId } = action.payload;
        state.user.playlists
          .find((playlist) => playlist._id === playlistId)
          .songs.push(songWithoutPlaylistId);
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        const playlist = state.user.playlists.find(
          (playlist) => playlist._id === action.payload.playlistId
        );
        if (playlist) {
          playlist.songs = playlist.songs.filter(
            (song) => song.spotifyId !== action.payload.spotifyId
          );
        }
      })
      .addCase(deleteUserPlaylist.fulfilled, (state, action) => {
        state.user.playlists = state.user.playlists.filter(
          (playlist) => playlist._id !== action.payload
        );
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
