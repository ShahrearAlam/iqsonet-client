import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savePosts: [],
  page: 1,
  followSuggestion: []
}

export const savePostSlice = createSlice({
  name: "savePostSlice",
  initialState,
  reducers: {
    addSavePost: (state, action) => {
      const idMap = {};
      const newPost = [];

      // Populate idMap with the _id values from arr1
      state.savePosts.forEach(item => {
        idMap[item._id] = true;
      });

      // Iterate through arr2 and add items with unique _id values to arr1
      action.payload?.savePosts?.forEach(item => {
        if (!idMap[item._id]) {
          newPost.push(item);
          idMap[item._id] = true;
        }
      });

      if (action.payload.infinityScrolling) {
        state.savePosts = [...state.savePosts, ...newPost];
      } else {
        state.savePosts = [...newPost, ...state.savePosts];
      }
      const currentPage = Math.floor(state.savePosts.length / 10);
      state.page = currentPage === 0 ? 1 : currentPage;
    },
    removeSavePost: (state, action) => {
      const restSavePost = state.savePosts?.filter(p => p._id !== action.payload._id);
      state.savePosts = restSavePost;
    },
    setSavePage: (state) => {
      state.page = state.page + 1;
    },
    reduceSavePageCount: (state) => {
      state.page = state.page > 1 ? state.page - 1 : state.page;
    },
    setFollowSuggestionForSavePost: (state, action) => {
      state.followSuggestion = action.payload;
    },
    updateSavePost: (state, action) => {
      const updatedPost = state.savePosts?.map(item => item.post._id === action.payload._id ? { ...item, post: action.payload } : item);
      state.savePosts = updatedPost;
    },
    resetSavePostState: () => initialState
  }
})

export const {
  addSavePost,
  removeSavePost,
  setSavePage,
  reduceSavePageCount,
  setFollowSuggestionForSavePost,
  updateSavePost,
  resetSavePostState
} = savePostSlice.actions

export default savePostSlice.reducer
