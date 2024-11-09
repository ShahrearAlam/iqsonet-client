import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobPosts: [],
  page: 1,
  totalApplicant: 0,
  totalApply: 0,
  totalJobPost: 0,
  applicationSeen: 0,
  queryString: ""
}

export const jobPostSlice = createSlice({
  name: "jobPostSlice",
  initialState,
  reducers: {
    setJobPost: (state, action) => {
      const { totalApplicant, totalApply, totalJobPost, applicationSeen, jobPosts } = action.payload;
      state.jobPosts = jobPosts;
      state.totalApplicant = totalApplicant;
      state.totalApply = totalApply;
      state.totalJobPost = totalJobPost;
      state.applicationSeen = applicationSeen;
      state.page = 1;
    },
    addJobPost: (state, action) => {

      const { totalApplicant, totalApply, totalJobPost, applicationSeen } = action.payload;

      state.totalApplicant = totalApplicant;
      state.totalApply = totalApply;
      state.totalJobPost = totalJobPost;
      state.applicationSeen = applicationSeen;

      const idMap = {};
      const newPost = [];

      // Populate idMap with the _id values from arr1
      state.jobPosts.forEach(item => {
        idMap[item._id] = true;
      });

      // Iterate through arr2 and add items with unique _id values to arr1
      action.payload?.jobPosts?.forEach(item => {
        if (!idMap[item._id]) {
          newPost.push(item);
          idMap[item._id] = true;
        }
      });

      state.jobPosts = [...state.jobPosts, ...newPost];
      const currentPage = Math.floor(state.jobPosts.length / 10);
      state.page = currentPage === 0 ? 1 : currentPage;
    },
    removeJobPost: (state, action) => {
      const restSavePost = state.jobPosts?.filter(p => p._id !== action.payload._id);
      state.jobPosts = restSavePost;
    },
    setJobPostPage: (state) => {
      state.page = state.page + 1;
    },
    reduceJobPostPageCount: (state) => {
      state.page = state.page > 1 ? state.page - 1 : state.page;
    },
    updateJobPost: (state, action) => {
      const updatedPost = state.jobPosts?.map(item => item.post._id === action.payload._id ? { ...item, post: action.payload } : item);
      state.jobPosts = updatedPost;
    },
    setQueryString: (state, action) => {
      state.queryString = action.payload;
    },
    resetjobPostState: () => initialState
  }
})

export const {
  setJobPost,
  addJobPost,
  removeJobPost,
  setJobPostPage,
  reduceJobPostPageCount,
  updateJobPost,
  setQueryString,
  resetjobPostState
} = jobPostSlice.actions

export default jobPostSlice.reducer
