import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: undefined,
  theme: undefined
}

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themeMode = action.payload.themeMode;
      state.theme = action.payload.theme;
    },
    resetThemeState : () => initialState
  }
})

export const {
  setTheme,
  resetThemeState
} = themeSlice.actions

export default themeSlice.reducer
