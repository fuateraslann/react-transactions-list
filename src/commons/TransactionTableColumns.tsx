import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { TTransaction } from 'types'

export const columns: ColumnsType<TTransaction> = [
  {
    title: 'Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
    render: (_, record) => {
      return <div>{dayjs(record.transactionDate).format('DD/MM/YYYY hh:mm')}</div>
    },
  },
  {
    title: 'Merchant Name',
    dataIndex: 'merchantName',
    key: 'merchantName',
    render: (_, record) => {
      return <Link to={'transactions/' + record.id}>{record.merchantName}</Link>
    },
  },
  {
    title: 'Amount',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount',
  },
  {
    title: 'Cardholder Name',
    dataIndex: 'cardHolderName',
    key: 'cardHolderName',
  },
  {
    title: 'Card Number',
    dataIndex: 'cardNumber',
    key: 'cardNumber',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
]
