import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const categories = [
  { id: '1', name: '食費' },
  { id: '2', name: '交通' },
  { id: '3', name: '娯楽' },
  { id: '4', name: 'その他' }
]

export default function EntryForm() {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0].id)
  const [memo, setMemo] = useState('')

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
      <Button variant="contained" color="primary" fullWidth>登録</Button>
    </Box>
  )
}