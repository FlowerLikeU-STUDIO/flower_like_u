import { createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk("logIn", async (data, thunkAPI) => {
  const result = "";
  return result.data;
});

export const profile = createAsyncThunk("getProfile", async (data, thunkAPI) => {
  const result = { name: "단무지" };
  return result.data;
});
