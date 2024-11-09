import { createSlice } from "@reduxjs/toolkit";
import { resetFeedState } from "../feed/feedSlice";
import { apiSlice } from "../api/apiSlice";
import { resetModalState } from "../modal/modalSlice";
import { resetNetworkState } from "../network/networkSlice";
import { resetProfileState } from "../profile/profileSlice";
import { resetSavePostState } from "../savePost/savePostSlice";
import { resetThemeState } from "../theme/themeSlice";

const initialState = {
  access_token: undefined,
  user: undefined
}

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user
    },
    userLoggedOut: () => {
      localStorage.removeItem("iqNetAuth");
      return initialState;
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer


// Handle logout and reset other slice states
export const logout = () => async (dispatch) => {
  // Dispatch the resetState action for all the slices
  dispatch(userLoggedOut());
  dispatch(resetFeedState());
  dispatch(resetModalState());
  dispatch(resetNetworkState());
  dispatch(resetProfileState());
  dispatch(resetSavePostState());
  dispatch(resetThemeState());
  // RTK Query State & catch clear
  await dispatch(apiSlice.util.resetApiState({ baseQuery: apiSlice.baseQuery }));
};
