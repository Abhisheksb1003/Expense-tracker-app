import { createSlice } from "@reduxjs/toolkit";
const initialState = { token: "", isLoggedin: false };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedin = true;
      localStorage.setItem("idToken", action.payload.token);
      let email = action.payload.email;
      const updatedEmail = email.replace(/[@.]/g, "");
      localStorage.setItem("email",updatedEmail)
    },
    logout(state) {
      state.token = "";
      state.isLoggedin = false;
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
    },
    rerenderlogin(state) {
      state.isLoggedin = true;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;