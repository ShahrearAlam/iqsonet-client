import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  personalInfo: {
    personal: {},
    phone: {},
    socialLinks: []
  },
  educationInfo: [],
  organizationInfo: [],
  isPersonalInfoEdit: false,
  isInterestEdit: false,
  isEducationEdit: false,
  isOrganizationEdit: false,
  profileData: [],
  profilePosts: [],
  page: 1,
  userPoints: {},
  otherPorfile: undefined,
  isFollow: false
}

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    userPersonalInfo: (state, action) => {
      const { personal, phone } = action.payload;
      state.personalInfo = { ...state.personalInfo, personal: { ...state.personalInfo.personal, ...personal }, phone };
      state.step += 1;
      state.isPersonalInfoEdit = true;
    },
    userInterestAchievementInfo: (state, action) => {
      const { personal } = state.personalInfo;
      const { interestAndAchievement, socialLinks } = action.payload;
      state.personalInfo = { ...state.personalInfo, personal: { ...personal, ...interestAndAchievement }, socialLinks: socialLinks };
      state.step += 1;
      state.isInterestEdit = true;
    },
    addEducationInfo: (state, action) => {
      state.educationInfo = action.payload;
      state.isEducationEdit = true;
    },
    userEducationInfo: (state, action) => {
      state.educationInfo = action.payload;
      state.step += 1;
      state.isEducationEdit = true;
    },
    userOrganizationInfo: (state, action) => {
      state.organizationInfo = action.payload;
      state.isOrganizationEdit = true;
    },
    profileEditFormPrevious: (state) => {
      state.step -= 1;
    },
    profileSkip: (state) => {
      state.step += 1;
    },
    profleEditStepReset: (state) => {
      state.step = 1;
      state.isInterestEdit = false;
      state.isEducationEdit = false;
      state.isOrganizationEdit = false;
      state.isPersonalInfoEdit = false;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload.profileData
      state.isFollow = action.payload.isFollow
    },
    updateProfilePost: (state, action) => {
      const updatedPost = state.profilePosts?.map(item => item._id === action.payload._id ? action.payload : item);
      state.profilePosts = updatedPost;
    },
    setUserPoints: (state, action) => {
      state.userPoints = action.payload
    },
    setOtherProfile: (state, action) => {
      state.otherPorfile = action.payload
    },
    addProfilePost: (state, action) => {
      const idMap = {};
      const newPost = [];

      // Populate idMap with the _id values from arr1
      state.profilePosts.forEach(item => {
        idMap[item._id] = true;
      });

      // Iterate through arr2 and add items with unique _id values to arr1
      action.payload.profilePosts.forEach(item => {
        if (!idMap[item._id]) {
          newPost.push(item);
          idMap[item._id] = true;
        }
      });

      if (action.payload.infinityScrolling) {
        state.profilePosts = [...state.profilePosts, ...newPost];
      } else {
        state.profilePosts = [...newPost, ...state.profilePosts];
      }
      const currentPage = Math.floor(state.profilePosts.length / 10);
      state.page = currentPage === 0 ? 1 : currentPage;
    },
    setProfilePage: (state) => {
      state.page = state.page + 1;
    },
    reduceProfilePageCount: (state) => {
      state.page = state.page > 1 ? state.page - 1 : state.page;
    },
    removeProfilePost: (state, action) => {
      const restSavePost = state.profilePosts?.filter(p => p._id !== action.payload._id);
      state.profilePosts = restSavePost;
    },
    resetProfileState: () => initialState
  }
})

export const {
  userPersonalInfo,
  userInterestAchievementInfo,
  userEducationInfo,
  userOrganizationInfo,
  profileEditFormPrevious,
  profleEditStepReset,
  addEducationInfo,
  setProfileData,
  updateProfilePost,
  setUserPoints,
  profileSkip,
  setOtherProfile,
  addProfilePost,
  setProfilePage,
  reduceProfilePageCount,
  removeProfilePost,
  resetProfileState
} = profileSlice.actions

export default profileSlice.reducer
