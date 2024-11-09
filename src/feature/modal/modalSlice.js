import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalPost: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalPost: (state, action) => {
      state.modalPost = action.payload;
    },
    resetModalState: () => initialState
  },
});

export const { setModalPost, resetModalState } = modalSlice.actions;
export default modalSlice.reducer;
