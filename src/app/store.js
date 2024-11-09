import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../feature/api/apiSlice";
import authReducer from "../feature/auth/authSlice";
import modalReducer from "../feature/modal/modalSlice";
import topicReducer from "../feature/community/topicSlice";
import profileReducer from "../feature/profile/profileSlice";
import networkReducer from "../feature/network/networkSlice";
import themeReducer from "../feature/theme/themeSlice";
import feedReducer from "../feature/feed/feedSlice";
import savePostReducer from "../feature/savePost/savePostSlice";
import resumeReducer from "../feature/resume/resumeSlice";
import jobApplyReducer from "../feature/jobApply/jobApplySlice";
import notificationReducer from "../feature/notification/notification.slice";
import singlePostReducer from "../feature/singlePost/singlePost.slice";
import jobPostReducer from "../feature/jobPost/jobPostSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    modal: modalReducer,
    topic: topicReducer,
    profile: profileReducer,
    network: networkReducer,
    theme: themeReducer,
    feed: feedReducer,
    savePost: savePostReducer,
    resume: resumeReducer,
    jobApply: jobApplyReducer,
    notification: notificationReducer,
    singlePost: singlePostReducer,
    jobPost: jobPostReducer
  },
  middleware: (gDm) => gDm().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
