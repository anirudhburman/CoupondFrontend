import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartCodesSlice = createSlice({
  name: "cartCodes",
  initialState: { value: initialState },
  reducers: {
    addCodeToCart: (state, action) => {
      state.value.push(action.payload);
    },
    removeCodeFromCart: (state, action) => {
      let removed = false;
      state.value = state.value.filter((code) => {
        if (!removed && code === action.payload) {
          removed = true;
          return false;
        }
        return true;
      });
    },
    clearCodesFromCart: (state) => {
      state.value = initialState;
    },
  },
});

export const { addCodeToCart, removeCodeFromCart, clearCodesFromCart } =
  cartCodesSlice.actions;
export default cartCodesSlice.reducer;
