import { Box, Typography } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

type Record = {
  id: string;
  date: string;
  amount: number;
  categoryId: string;
  category: string;
};

export default function Dashboard({ records }: { records: Record[] }) {
  const categoryData = records.reduce((acc, record) => {
    const category = acc.find(item => item.name === record.category);
    if (category) {
      category.value += record.amount;
    } else {
      acc.push({ name: record.category, value: record.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <Box>
      <Typography variant="h6" mt={8} mb={2} textAlign="center">カテゴリ別支出割合</Typography>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name} ${value}円`}
            labelLine
          >
            {categoryData.map((_, idx: number) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}