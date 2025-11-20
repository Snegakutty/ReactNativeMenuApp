import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {addonsApi, Addon} from '../../services/api';
import type {RootState} from '../index';

interface AddonsState {
  addons: Addon[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AddonsState = {
  addons: [],
  isLoading: false,
  error: null,
};

export const fetchAddonsForItem = createAsyncThunk(
  'addons/fetchAddonsForItem',
  async (itemId: number, {rejectWithValue}) => {
    try {
      const data = await addonsApi.listForItem(itemId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load addons',
      );
    }
  },
);

const addonsSlice = createSlice({
  name: 'addons',
  initialState,
  reducers: {
    clearAddons: state => {
      state.addons = [];
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddonsForItem.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddonsForItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addons = action.payload;
      })
      .addCase(fetchAddonsForItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearAddons, clearError} = addonsSlice.actions;


export const selectAddons = (state: RootState) => state.addons.addons;
export const selectAddonsLoading = (state: RootState) =>
  state.addons.isLoading;
export const selectAddonsError = (state: RootState) => state.addons.error;

export default addonsSlice.reducer;

