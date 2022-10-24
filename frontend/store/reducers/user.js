import { createSlice } from "@reduxjs/toolkit";
import { logIn, profile } from "../actions/user";

const initialState = {
  isLogin: false,
  data: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(logIn.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(profile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
      }),
});

export default userSlice;
export const { logOut } = userSlice.actions;
