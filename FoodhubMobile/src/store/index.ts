import {configureStore} from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';
import addonsReducer from './slices/addonsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    addons: addonsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

