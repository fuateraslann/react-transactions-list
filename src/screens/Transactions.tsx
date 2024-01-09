import { useGetTransactions } from 'hooks'
import { isEmpty } from 'lodash'
import { Card, Result, Table } from 'antd'
import { columns } from 'commons/TransactionTableColumns'
import { TransactionGraph } from 'components'
import { TTransaction } from 'types'

const Transactions = () => {
  const { data: transactions, isFetching, isError } = useGetTransactions<TTransaction[]>()

  if (isError)
    return <Result status="error" title="There are some problems with your operation. Please refresh the page." />
  if (isFetching) return <>Loading...</>
  if (!transactions) return <>No Transactions Found</>
  if (isEmpty(transactions)) return <>No Transactions Found</>

  return (
    <div>
      <Card>
        <Table loading={isFetching} dataSource={transactions} columns={columns} />
      </Card>
      <Card style={{ height: '30%', width: '30%', marginTop: 10, textAlign: 'center' }}>
        <TransactionGraph transactions={transactions} />
      </Card>
    </div>
  )
}

export default Transactions
