import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCategories, createRecord } from './api/apiClient'

type Category = {
  id: string;
  name: string;
  color?: string;
};

interface EntryFormProps {
  onRecordAdded: () => void;
}

export default function EntryForm({ onRecordAdded }: EntryFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [memo, setMemo] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setCategory(categoriesData[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const record = {
        date,
        amount: Number(amount),
        categoryId: category,
        memo,
        type
      };

      await createRecord(record);
      setAmount('');
      setMemo('');
      onRecordAdded();
      alert('登録が完了しました');
    } catch (error) {
      console.error('Error creating record:', error);
      alert('登録に失敗しました');
    }
  };

  return (
    <Box maxWidth={400} display="flex" flexDirection="column" gap={2} mx="auto">
      <Typography variant="h6" mt={8} mb={2} textAlign="center">収支入力</Typography>
      <TextField
        select
        label="種別"
        value={type}
        onChange={e => setType(e.target.value as 'income' | 'expense')}
        fullWidth
      >
        <MenuItem value="income">収入</MenuItem>
        <MenuItem value="expense">支出</MenuItem>
      </TextField>
      <TextField
        label="日付"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="金額"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        fullWidth
      />
      <TextField
        select
        label="カテゴリ"
        value={category}
        onChange={e => setCategory(e.target.value)}
        fullWidth
      >
        {categories.map(cat => (
          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="メモ"
        value={memo}
        onChange={e => setMemo(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!amount || !category}
      >
        登録
      </Button>
    </Box>
  )
}