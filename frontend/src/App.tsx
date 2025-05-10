import { useState } from 'react'
import { AppBar, Tabs, Tab, Box, Typography, Toolbar } from '@mui/material'
import Dashboard from './Dashboard'
import EntryForm from './EntryForm'
import HistoryList from './HistoryList'
import CategoryManager from './CategoryManager'

function App() {
  const [tab, setTab] = useState(0)

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
          sx={{ bgcolor: 'background.paper' }}
        >
          <Tab label="ダッシュボード" />
          <Tab label="収支入力" />
          <Tab label="履歴一覧" />
          <Tab label="カテゴリ管理" />
        </Tabs>
      </AppBar>
      <Box alignContent={'center'} sx={{ padding: 2 }}>
          {tab === 0 && <Dashboard />}
          {tab === 1 && <EntryForm />}
          {tab === 2 && <HistoryList />}
          {tab === 3 && <CategoryManager />}
      </Box>
    </Box>
  )
}

export default App
