import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {itemsApi, Item} from '../../services/api';
import type {RootState} from '../index';

interface ItemsState {
  itemsMap: Record<number, Item[]>;
  isLoading: boolean;
  loadingCategoryId: number | null;
  error: string | null;
}

const initialState: ItemsState = {
  itemsMap: {},
  isLoading: false,
  loadingCategoryId: null,
  error: null,
};

export const fetchItemsForCategory = createAsyncThunk(
  'items/fetchItemsForCategory',
  async (categoryId: number, {rejectWithValue}) => {
    try {
      const data = await itemsApi.listForCategory(categoryId);
      return {categoryId, items: data};
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load items',
      );
    }
  },
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItems: state => {
      state.itemsMap = {};
    },
    clearItemsForCategory: (state, action: PayloadAction<number>) => {
      delete state.itemsMap[action.payload];
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItemsForCategory.pending, (state, action) => {
        state.isLoading = true;
        state.loadingCategoryId = action.meta.arg;
        state.error = null;
      })
      .addCase(fetchItemsForCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loadingCategoryId = null;
        state.itemsMap[action.payload.categoryId] = action.payload.items;
      })
      .addCase(fetchItemsForCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingCategoryId = null;
        state.error = action.payload as string;
      });
  },
});

export const {clearItems, clearItemsForCategory, clearError} =
  itemsSlice.actions;

export const selectItemsMap = (state: RootState) => state.items.itemsMap;
export const selectItemsLoading = (state: RootState) => state.items.isLoading;
export const selectItemsLoadingCategoryId = (state: RootState) =>
  state.items.loadingCategoryId;
export const selectItemsError = (state: RootState) => state.items.error;

export default itemsSlice.reducer;

