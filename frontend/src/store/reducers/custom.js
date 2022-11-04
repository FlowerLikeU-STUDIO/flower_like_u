import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  package: null,
  size: null,
  flowers: null,
  current_flower: null,
  current_location: null,
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
    makeFlowerList: (state, action) => {
      return { ...state, flowers: action.payload };
    },
    makeCurrentFlower: (state, action) => {
      return { ...state, current_flower: action.payload };
    },
    makeCurrentLocation: (state, action) => {
      return { ...state, current_location: action.payload };
    },
  },
});

export default customSlice;
export const {
  selectPackage,
  selectSize,
  makeFlowerList,
  makeCurrentFlower,
  makeCurrentLocation,
} = customSlice.actions;
