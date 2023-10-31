import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: initialState },
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromCart: (state, action) => {
      let removed = false;
      state.value = state.value.filter((coupon) => {
        if (!removed && coupon.couponId === action.payload) {
          removed = true;
          return false;
        }
        return true;
      });
    },
    clearCart: (state) => {
      state.value = initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
