import { Doughnut } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { TTransaction } from 'types'
import { graphColors } from 'constants/colors'

const pieChartOptions = {
  responsive: true,
}
const TransactionGraph = ({ transactions }: { transactions: TTransaction[] }) => {
  const initialMonthlyValues = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  }

  const graphData = transactions.reduce((acc, current) => {
    const month = Object.keys(initialMonthlyValues)[dayjs(current.transactionDate).get('month')]
    acc[month] += current.transactionAmount
    return acc
  }, initialMonthlyValues as { [key: string]: number })

  const pieChartData = {
    labels: Object.keys(graphData),
    datasets: [
      {
        data: Object.values(graphData),
        backgroundColor: graphColors,
        hoverBackgroundColor: graphColors,
      },
    ],
  }

  return (
    <div>
      <h2>Transaction Amounts</h2>
      <Doughnut data={pieChartData} options={pieChartOptions} />
    </div>
  )
}

export default TransactionGraph
