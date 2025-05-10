import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { createCategory, getCategories } from './api/apiClient';
import type { Record } from './App';

interface CategoryManagerProps {
  children?: React.ReactNode;
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
  fetchData: (setRecords: React.Dispatch<React.SetStateAction<Record[]>>) => Promise<void>;
}

export default function CategoryManager({ children, setRecords, fetchData }: CategoryManagerProps) {
  const [categories, setCategories] = useState<{ id: string; name: string; color?: string }[]>([]);

    const handleCreateCategory = async (categoryName: string) => {
    try {
      const newCategory = {
        name: categoryName,
        color: "#00FF00",
      };
      const createdCategory = await createCategory(newCategory);
      console.log("Created Category:", createdCategory);
      setRecords((prev: Record[]) => [
        ...prev,
        {
          id: createdCategory.id,
          date: "",
          amount: 0,
          categoryId: createdCategory.id,
          category: createdCategory.name,
          memo: "",
          type: "expense",
        } as Record,
      ]);
      setCategories((prev) => [...prev, createdCategory]);
      setNewCat('');
      fetchData(setRecords);
      alert("カテゴリが追加されました！");
    } catch (error) {
      console.error("カテゴリ追加中にエラーが発生しました:", error);
      alert("カテゴリの追加に失敗しました。");
    }
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories() as { id: string; name: string; color?: string }[];
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const [newCat, setNewCat] = useState('')


  return (
    <Box maxWidth={400} display="flex" flexDirection="column" gap={2} mx="auto">
      <Typography variant="h6" mt={8} mb={2} textAlign="center">カテゴリ管理</Typography>
      <Box display="flex" gap={1} mb={2} width="100%">
        <TextField
          label="新規カテゴリ"
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={() => handleCreateCategory(newCat)}>追加</Button>
      </Box>
      <List sx={{ width: '100%' }}>
        {categories.map(cat => (
          <ListItem key={cat.id} divider>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
      {children}
    </Box>
  )
}