import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, Category, Item, Addon,menuApi } from '../../services/api';
import { RootState } from '../index';

export const fetchFullMenu = createAsyncThunk(
  'menu/fetchFullMenu',
  async () => {
    const data = await menuApi.full();
    return data;
  }
);

interface FullCategory extends Category {
  Items: (Item & { addons: Addon[] })[];
}

interface MenuState {
  categories: Category[];
  itemsByCategory: Record<number, Item[]>;
  addonsByItem: Record<number, Addon[]>;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: MenuState = {
  categories: [],
  itemsByCategory: {},
  addonsByItem: {},
  loading: false,
  error: null,
  loaded: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFullMenu.pending, state => {
        state.loading = true;
      })
    .addCase(fetchFullMenu.fulfilled, (state, action) => {
        const { categories } = action.payload as { categories: FullCategory[] };

        state.categories = categories;

        state.itemsByCategory = {};
        state.addonsByItem = {};

        categories.forEach((cat: FullCategory) => {
            if (cat.Items && cat.Items.length > 0) {
            state.itemsByCategory[cat.id] = cat.Items;

            cat.Items.forEach(item => {
                if (item.addons) {
                state.addonsByItem[item.id] = item.addons;
                }
            });
            }
        });

        state.loading = false;
        state.error = null;
        state.loaded = true;
        })
      .addCase(fetchFullMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load menu';
      });
  },
});
export const selectCategories = (state: RootState) => state.menu.categories;
export const selectItemsByCategory = (state: RootState) => state.menu.itemsByCategory;
export const selectAddonsByItem = (state: RootState) => state.menu.addonsByItem;
export const selectMenuLoading = (state: RootState) => state.menu.loading;
export const selectMenuLoaded = (state: RootState) => state.menu.loaded;

export default menuSlice.reducer;
