import { Box, Typography } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: '食費', value: 4000 },
  { name: '交通', value: 2000 },
  { name: '娯楽', value: 1500 },
  { name: 'その他', value: 1000 }
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h6" mt={8} mb={2} textAlign="center">カテゴリ別支出割合</Typography>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name} ${value}円`}
            labelLine
          >
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}