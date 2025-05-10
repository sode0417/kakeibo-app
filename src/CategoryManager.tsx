import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function CategoryManager() {
  const [categories, setCategories] = useState([
    { id: '1', name: '食費' },
    { id: '2', name: '交通' },
    { id: '3', name: '娯楽' },
    { id: '4', name: 'その他' }
  ])
  const [newCat, setNewCat] = useState('')

  const handleAdd = () => {
    if (newCat.trim()) {
      setCategories([...categories, { id: Date.now().toString(), name: newCat }])
      setNewCat('')
    }
  }

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
        <Button variant="contained" onClick={handleAdd}>追加</Button>
      </Box>
      <List sx={{ width: '100%' }}>
        {categories.map(cat => (
          <ListItem key={cat.id} divider>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}