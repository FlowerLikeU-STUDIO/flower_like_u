import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  package: null,
  size: null,
  flowers: [],
};

const customSlice = createSlice({
  name: "custom",
  initialState,
  reducers: {
    selectPackage: (state, action) => {
      return { ...state, package: action.payload };
    },
    selectSize: (state, action) => {
      return { ...state, size: action.payload };
    },
  },
});

export default customSlice;
export const { selectPackage, selectSize } = customSlice.actions;
