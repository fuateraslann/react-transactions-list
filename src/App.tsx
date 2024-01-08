import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { Layout, Tooltip } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './App.css'
import TransactionDetail from './screens/TransactionDetail'
import Transactions from './screens/Transactions'
import { ArcElement } from 'chart.js'
import Chart from 'chart.js/auto'

Chart.register(ArcElement)

const { Header, Content } = Layout

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Layout>
      <Header
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h4>Transactions </h4>
        {location.pathname.includes('transactions') && (
          <Tooltip title="Back To Home Page">
            <ArrowLeftOutlined
              onClick={() => {
                navigate('/')
              }}
            />
          </Tooltip>
        )}
      </Header>
      <Content style={{ padding: 50, backgroundColor: '#f5f5f5' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/" element={<Transactions />} />
        <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
      </Route>
    </Routes>
  )
}
export default App
