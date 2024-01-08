import { AxiosError } from 'axios'
import { UseQueryResult, useQuery } from 'react-query'
import { TTransaction } from 'types'
import { axios } from 'utils'

export const useGetTransactions = <T>(parameters?: { id: number }): UseQueryResult<T> => {
  const url = parameters ? `transactions/${parameters.id}` : 'transactions'
  const cacheKey = parameters ? ['transactions', parameters.id] : 'transactions'
  const data_sources = useQuery(
    cacheKey,
    async (): Promise<T> => {
      const data = await axios
        .get(url)
        .then((response) => {
          return response.data
        })
        .catch((error: AxiosError<{ error: any }>) => {
          console.log(error)
        })
      return data
    },
    { refetchOnWindowFocus: false }
  )
  return data_sources
}
