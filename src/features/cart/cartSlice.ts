import { createSlice } from '@reduxjs/toolkit';
import type { CartType } from '../../types';
import type { RootState } from '../../store';

const initialState: { cart: CartType[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: { type: string; payload: CartType }) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (store: RootState) => {
  return store.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
};

export const getTotalCartPrice = (store: RootState) => {
  return store.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
};

export const getCart = (store: RootState) => {
  console.log(store.cart.cart);

  return store.cart.cart;
};

export const getPizzaQuantityById = (id: string) => (store: RootState) => {
  return store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
