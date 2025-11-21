import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Addon } from '../../services/api';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selectedAddons: Addon[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item =>
        item.id === action.payload.id &&
        JSON.stringify(item.selectedAddons) === JSON.stringify(action.payload.selectedAddons)
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemToIncrement = state.items.find(item => item.id === action.payload);
      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemToDecrement = state.items.find(item => item.id === action.payload);
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
      } else if (itemToDecrement && itemToDecrement.quantity === 1) {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateItemAddons: (state, action: PayloadAction<{ index: number; newAddons: Addon[] }>) => {
      const { index, newAddons } = action.payload;
      if (state.items[index]) {
        state.items[index].selectedAddons = newAddons;
      }
    },
  },
});

export const { addItem, incrementQuantity, decrementQuantity, removeItem, clearCart,updateItemAddons } = cartSlice.actions;

export default cartSlice.reducer;
