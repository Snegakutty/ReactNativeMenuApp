import axios from 'axios';
import {Platform} from 'react-native';

import localMenuData from '../data/menuData.json';
const getApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {

      return 'http://10.0.2.2:3000';
    } else {

      return 'http://localhost:3000';
    }
  }

  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    
    return Promise.reject(error);
  },
);

export type Category = {
  id: number;
  name: string;
};

export type VegType = 'veg' | 'non-veg' | 'VEG' | 'NON-VEG';

export type Addon = {
  item_id: any;
  id: number;
  name: string;
  price: number;
};

export type Item = {
  category_id: any;
  id: number;
  name: string;
  price: number;
  veg_type: VegType;
  is_bestseller: boolean;
  size?: string | null;
  prep_time_mins?: number | null;
  addons?: Addon[];
};

export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const {data} = await apiClient.get<Category[]>('/categories');
    return data;
  },
};

export const itemsApi = {
  listForCategory: async (categoryId: number): Promise<Item[]> => {
    const {data} = await apiClient.get<Item[]>(`/items/${categoryId}`);
    return data;
  },
};

export const menuApi = {
  full: async () => {
    try {
      console.log('Attempting to fetch menu from Server...');
      
      const { data } = await apiClient.get('/menu/full');
      console.log('Connected to Server. Using DB data.');
      return data;

    } catch (error) {
     
      console.warn('Server unreachable or failed. Switching to Local JSON.');
      
     
      return localMenuData;
    }
  },
};

