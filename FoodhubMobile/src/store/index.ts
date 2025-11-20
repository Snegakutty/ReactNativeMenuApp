import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import menuReducer from './slices/menuSlice';   // NEW (categories + items + addons)
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,   
    ui: uiReducer,                  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
