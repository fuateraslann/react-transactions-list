import { Navigate, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'

import { Layout, Tooltip } from 'antd'
import { ArrowLeftOutlined, LogoutOutlined } from '@ant-design/icons'
import './App.css'
import TransactionDetail from './screens/TransactionDetail'
import Transactions from './screens/Transactions'
import { ArcElement } from 'chart.js'
import Chart from 'chart.js/auto'
import { RequireAuth } from 'components'
import Login from 'screens/Login'

Chart.register(ArcElement)

const { Header, Content } = Layout

const SigninWithRedirect = (): JSX.Element => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/transactions" /> : <Login />
}

function Dashboard() {
  const params = useParams()
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
        {Object.keys(params).includes('transactionId') ? (
          <Tooltip title="Back To Home Page">
            <ArrowLeftOutlined
              onClick={() => {
                navigate('/')
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Logout">
            <LogoutOutlined
              onClick={() => {
                localStorage.removeItem('token')
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
      <Route element={<SigninWithRedirect />} path="/" />
      <Route
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
      </Route>
    </Routes>
  )
}
export default App
