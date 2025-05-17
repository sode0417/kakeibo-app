import { Box, Button, List, ListItem, ListItemText, TextField, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, type Category } from './api/apiClient';
import type { Record } from './App';
import { ConfirmationDialog } from './components/ConfirmationDialog';

interface CategoryManagerProps {
  children?: React.ReactNode;
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
  fetchData: (setRecords: React.Dispatch<React.SetStateAction<Record[]>>) => Promise<void>;
}

export default function CategoryManager({ children, setRecords, fetchData }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

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

  const handleDeleteClick = (category: Category) => {
    console.log('Delete clicked for category:', category);
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('Delete confirmed for category:', categoryToDelete);
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      fetchData(setRecords);
      alert("カテゴリが削除されました！");
    } catch (error) {
      const axiosError = error as { response?: { status: number } };
      console.error('Error deleting category:', error);
      if (axiosError.response?.status === 400) {
        alert("このカテゴリは使用中のため削除できません。");
      } else {
        alert("カテゴリの削除に失敗しました。");
      }
    } finally {
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const [newCat, setNewCat] = useState('')

  console.log("Categories:", categories);

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
          <ListItem
            key={cat.id}
            divider
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(cat)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
      {children}
      
      <ConfirmationDialog
        open={deleteModalOpen}
        title="カテゴリの削除"
        message={`${categoryToDelete?.name}を削除してもよろしいですか？`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  )
}