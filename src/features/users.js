import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  userId: 0,
  username: "",
  email: "",
  role: "",
  phoneNumber: "",
  listOfCoupons: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState: { value: initialUser },
  reducers: {
    fetchUser: (state, action) => {
      state.value = action.payload;
    },
    logoutUser: (state) => {
      state.value = initialUser;
    },
    updateUserState: (state, action) => {
      const { email, phoneNumber } = action.payload;

      state.value = {
        ...state.value,
        email: email,
        phoneNumber: phoneNumber,
      };
    },
  },
});

export const { fetchUser, logoutUser, updateUserState } = userSlice.actions;
export default userSlice.reducer;
