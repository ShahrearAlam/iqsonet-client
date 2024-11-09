import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  page: 1,
  followSuggestion: []
}

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const idMap = {};
      const newPost = [];

      // Populate idMap with the _id values from arr1
      state.posts.forEach(item => {
        idMap[item._id] = true;
      });

      // Iterate through arr2 and add items with unique _id values to arr1
      action.payload.forEach(item => {
        if (!idMap[item._id]) {
          newPost.push(item);
          idMap[item._id] = true;
        }
      });

      state.posts = [...state.posts, ...newPost];
      const currentPage = Math.floor(state.posts.length / 10);
      state.page = currentPage === 0 ? 1 : currentPage;
    },
    setFeedPage: (state) => {
      state.page = state.page + 1;
    },
    reduceFeedPageCount: (state) => {
      state.page = state.page > 1 ? state.page - 1 : state.page;
    },
    updateFeedPost: (state, action) => {
      const updatedPost = state.posts?.map(item => item._id === action.payload._id ? action.payload : item);
      state.posts = updatedPost;
    },
    setFollowSuggestionForFeed: (state, action) => {
      state.followSuggestion = action.payload;
    },
    resetFeedState: () => initialState
  }
})

export const {
  addPost,
  setFeedPage,
  reduceFeedPageCount,
  updateFeedPost,
  setFollowSuggestionForFeed,
  resetFeedState
} = feedSlice.actions

export default feedSlice.reducer