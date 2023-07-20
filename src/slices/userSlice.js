import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const signinUser = createAsyncThunk(
  "user/signin",
  async (payload, thunkAPI) => {
    const { getAccessTokenSilently } = useAuth0();

    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.post(`http://localhost:5001/users/signin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        email: payload.email,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: "idle", error: null },
  reducers: {},
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

export default userSlice.reducer;
