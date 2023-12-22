import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: false,
};
const ThemeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setDarkTheme(state) {
      state.darkTheme = true;
    },
  },
});

export const Themeactions = ThemeSlice.actions;
export default ThemeSlice.reducer;