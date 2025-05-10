import axios from 'axios';

type Record = {
  date: string;
  amount: number;
  categoryId: string;
  memo?: string;
  type: 'income' | 'expense';
};

type Category = {
  name: string;
  color?: string;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:5268/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecords = async () => {
  const response = await apiClient.get('/records');
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const createRecord = async (record: Record) => {
  const response = await apiClient.post('/records', record);
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await apiClient.post('/categories', category);
  return response.data;
};

export default apiClient;