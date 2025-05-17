import { Box, List, ListItem, ListItemText, Typography, Chip } from '@mui/material'


type Record = {
  id: string;
  date: string;
  amount: number;
  category?: string;
  type: 'income' | 'expense';
  memo?: string;
};

export default function HistoryList({ records }: { records: Record[] }) {

  return (
    <Box maxWidth={400} display="flex" flexDirection="column" gap={2} mx="auto">
      <Typography variant="h6" mt={8} mb={2} textAlign="center">履歴一覧</Typography>
      <List sx={{ width: '100%' }}>
        {records.map(rec => (
          <ListItem key={rec.id} divider>
            <ListItemText
              primary={`${rec.date}  ${rec.category || "未分類"}  ${rec.amount.toLocaleString()}円`}
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