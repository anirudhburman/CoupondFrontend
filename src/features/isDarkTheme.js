import { createSlice } from "@reduxjs/toolkit";

export const isDarkThemeSlice = createSlice({
  name: "isDarkTheme",
  initialState: { value: false },
  reducers: {
    changeTheme: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeTheme } = isDarkThemeSlice.actions;
export default isDarkThemeSlice.reducer;
