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

export const getRecords = async (): Promise<Record[]> => {
  const response = await apiClient.get<Record[]>('/records');
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const createRecord = async (record: Record) => {
  console.log("Sending record data:", record);
  const response = await apiClient.post('/records', record);
  return response.data;
};

export const createCategory = async (category: Category): Promise<{ id: string; name: string; color?: string }> => {
  console.log("Sending category data:", category);
  const response = await apiClient.post<{ id: string; name: string; color?: string }>('/categories', category);
  return response.data;
};

export default apiClient;