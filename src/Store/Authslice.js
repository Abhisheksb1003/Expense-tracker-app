import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", isLoggedin: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedin = true;
      localStorage.setItem("idToken", action.payload);
    },
    logout(state) {
      state.token = "";
      state.isLoggedin = false;
      localStorage.removeItem("idToken");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;