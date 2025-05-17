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
  try {
    const response = await apiClient.get<Record[]>('/records');
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createRecord = async (record: Record) => {
  try {
    console.log("Sending record data:", record);
    const response = await apiClient.post('/records', record);
    return response.data;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

export const createCategory = async (category: Category): Promise<{ id: string; name: string; color?: string }> => {
  try {
    console.log("Sending category data:", category);
    const response = await apiClient.post<{ id: string; name: string; color?: string }>('/categories', category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export default apiClient;