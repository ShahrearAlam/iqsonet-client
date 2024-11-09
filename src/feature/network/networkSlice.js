import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followRequest: [],
  followSuggestion: [],
  follower: [],
  following: []
}

export const networkSlice = createSlice({
  name: "networkSlice",
  initialState,
  reducers: {
    setFollowRequest: (state, action) => {
      state.followRequest = action.payload
    },
    setFollowSuggestion: (state, action) => {
      state.followSuggestion = action.payload
    },
    setFollower: (state, action) => {
      state.follower = action.payload
    },
    setFollowing: (state, action) => {

      // Set following Data
      state.following = action.payload

      const followingUsernames = new Set(action.payload.map(user => user.followee
        .username));

      const result = state.follower.map(({ follower, ...rest }) => ({
        follower: {
          _id: follower._id,
          username: follower.username,
          personal: {
            fullname: follower.personal.fullname,
            profilePicture: follower.personal.profilePicture
          }
        },
        ...rest,
        isFollow: followingUsernames.has(follower.username)
      }));

      // Set follower Data
      state.follower = result;
    },
    resetNetworkState: () => initialState
  }
})

export const {
  setFollowRequest,
  setFollowSuggestion,
  setFollower,
  setFollowing,
  resetNetworkState
} = networkSlice.actions

export default networkSlice.reducer
