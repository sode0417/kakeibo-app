import { Box, List, ListItem, ListItemText, Typography, Chip } from '@mui/material'

const dummyRecords = [
  { id: '1', date: '2025-05-01', amount: 1200, category: '食費', type: 'expense', memo: 'ランチ' },
  { id: '2', date: '2025-05-02', amount: 5000, category: '収入', type: 'income', memo: '給料' },
  { id: '3', date: '2025-05-03', amount: 800, category: '交通', type: 'expense', memo: '電車' }
]

export default function HistoryList() {
  return (
    <Box maxWidth={400} display="flex" flexDirection="column" gap={2} mx="auto">
      <Typography variant="h6" mt={8} mb={2} textAlign="center">履歴一覧</Typography>
      <List sx={{ width: '100%' }}>
        {dummyRecords.map(rec => (
          <ListItem key={rec.id} divider>
            <ListItemText
              primary={`${rec.date}  ${rec.category}  ${rec.amount.toLocaleString()}円`}
              secondary={rec.memo}
            />
            <Chip
              label={rec.type === 'income' ? '収入' : '支出'}
              color={rec.type === 'income' ? 'success' : 'error'}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}