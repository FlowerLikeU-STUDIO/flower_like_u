import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: () => {
      return {
        isOpen: true,
      };
    },
    modalClose: () => initialState,
  },
});

export default modalSlice;
export const { modalOpen, modalClose } = modalSlice.actions;
