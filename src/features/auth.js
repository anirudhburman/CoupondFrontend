import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  roles: [],
  accessToken: "",
  tokenType: "Bearer",
  isLoggedIn: false, // Add the isLoggedIn property
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: initialState },
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload, isLoggedIn: true };
    },
    logout: (state) => {
      state.value = initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
