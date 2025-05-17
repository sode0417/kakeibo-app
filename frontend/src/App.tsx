import { useEffect, useState } from 'react';
import { getRecords, getCategories } from './api/apiClient';
import { AppBar, Tabs, Tab, Box, Typography, Toolbar } from '@mui/material'
import Dashboard from './Dashboard'
import EntryForm from './EntryForm'
import HistoryList from './HistoryList'
import CategoryManager from './CategoryManager'

export type Record = {
    id: string;
    date: string;
    amount: number;
    categoryId: string;
    category?: string;
    memo?: string;
    type: 'income' | 'expense';
};

const fetchData = async (setRecords: React.Dispatch<React.SetStateAction<Record[]>>) => {
  try {
    const records = await getRecords();
    const mappedRecords = records.map(record => ({
      ...record,
      category: "未分類" // 仮のカテゴリ名を設定
    }));
    setRecords(mappedRecords as Record[]);
    const categories = await getCategories();
    console.log('Categories:', categories);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function App() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    fetchData(setRecords);
  }, []);

  const [tab, setTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            家計簿アプリ プロトタイプ
          </Typography>
        </Toolbar>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          aria-label="家計簿アプリの画面切替タブ"
          sx={{
            bgcolor: 'background.paper',
            '& .Mui-selected': {
              fontWeight: 'bold',
            },
          }}
        >
          <Tab label="ダッシュボード" />
          <Tab label="収支入力" />
          <Tab label="履歴一覧" />
          <Tab label="カテゴリ管理" />
        </Tabs>
      </AppBar>
      <Box alignContent={'center'} sx={{ padding: 2 }}>
          {tab === 0 && <Dashboard records={records} />}
          {tab === 1 && <EntryForm />}
          {tab === 2 && <HistoryList records={records} />}
          {tab === 3 && (
            <CategoryManager setRecords={setRecords} fetchData={fetchData} />
          )}
      </Box>
    </Box>
  )
}

export default App
