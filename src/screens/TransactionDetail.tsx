import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useGetTransactions } from 'hooks/endpoints/useGetTransactions'
import { toNumber } from 'lodash'
import { Col, Divider, Result, Row, Tag, Typography } from 'antd'

import { TTransaction } from 'types'

const { Title } = Typography

const transactionTitleMapper: { [key in keyof TTransaction]: string } = {
  cardHolderName: 'Cardholder Name:',
  cardNumber: 'Card Number:',
  merchantName: 'Merchant Name:',
  transactionAmount: 'Transaction Amounts:',
  id: 'ID:',
  transactionDate: 'Transaction Date:',
}

const InfoSection = ({ text, title, extra }: { text: string | number; title: string; extra?: JSX.Element }) => {
  return (
    <div>
      <Title level={5}>{title}</Title>
      {extra ?? text}
      <Divider />
    </div>
  )
}

const TransactionDetail = () => {
  const { transactionId } = useParams()
  console.log(transactionId)
  const {
    data: transactionDetail,
    isError,
    isLoading,
  } = useGetTransactions<TTransaction>(transactionId ? { id: toNumber(transactionId) } : undefined)

  if (isError)
    return <Result status="error" title="There are some problems with your operation. Please refresh the page." />
  if (isLoading) return <>Loading...</>
  if (!transactionDetail) return <>No Transaction Info Found</>

  return (
    <Row>
      <Col span={15} offset={1}>
        {Object.keys(transactionTitleMapper).map((e) => {
          return (
            <InfoSection
              text={transactionDetail[e as keyof TTransaction]}
              title={transactionTitleMapper[e as keyof TTransaction]}
              extra={
                e === 'transactionDate' ? (
                  <Tag color="geekblue">{dayjs(transactionDetail.transactionDate).format('DD/MM/YYYY hh:mm')}</Tag>
                ) : undefined
              }
            />
          )
        })}
      </Col>
    </Row>
  )
}

export default TransactionDetail
