import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item} from '../../services/api';
import type {RootState} from '../types';

interface UIState {
  selectedCategoryId: number | null;
  selectedItem: Item | null;
  modalVisible: boolean;
}

const initialState: UIState = {
  selectedCategoryId: null,
  selectedItem: null,
  modalVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
      if (action.payload === null) {
        state.selectedItem = null;
        state.modalVisible = false;
      }
    },
    setSelectedItem: (state, action: PayloadAction<Item | null>) => {
      state.selectedItem = action.payload;
    },
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.modalVisible = action.payload;
      if (!action.payload) {
        state.selectedItem = null;
      }
    },
    closeModal: state => {
      state.modalVisible = false;
      state.selectedItem = null;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedItem,
  setModalVisible,
  closeModal,
} = uiSlice.actions;

// Selectors
export const selectSelectedCategoryId = (state: RootState) =>
  state.ui.selectedCategoryId;
export const selectSelectedItem = (state: RootState) => state.ui.selectedItem;
export const selectModalVisible = (state: RootState) => state.ui.modalVisible;

export default uiSlice.reducer;

