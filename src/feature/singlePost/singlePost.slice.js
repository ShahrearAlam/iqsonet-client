import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  followSuggestion: []
}

export const singlePostSlice = createSlice({
  name: "singlePostSlice",
  initialState,
  reducers: {
    setSinglePost: (state, action) => {
      if (action.payload) {
        state.post = action.payload;
      }
    },
    setFollowSuggestionForSinglePost: (state, action) => {
      state.followSuggestion = action.payload;
    },
    resetSinglePostState: () => initialState
  }
})

export const {
  setSinglePost,
  setFollowSuggestionForSinglePost,
  resetSinglePostState
} = singlePostSlice.actions

export default singlePostSlice.reducer
