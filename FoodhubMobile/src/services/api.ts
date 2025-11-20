import axios from 'axios';
import {Platform} from 'react-native';


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
  timeout: 10_000,
});
//clean the api err and provde readable msgs
apiClient.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Something went wrong while contacting the API.';
    return Promise.reject(new Error(message));
  },
);

export type Category = {
  id: number;
  name: string;
};

export type VegType = 'veg' | 'non-veg' | 'VEG' | 'NON-VEG';

export type Addon = {
  id: number;
  name: string;
  price: number;
};

export type Item = {
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

export const addonsApi = {
  listForItem: async (itemId: number): Promise<Addon[]> => {
    const {data} = await apiClient.get<Addon[]>(`/addons/${itemId}`);
    return data;
  },
};

