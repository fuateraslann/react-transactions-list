import { AxiosResponse } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { axios } from 'utils'

const AUTH_URL = (process.env.REACT_APP_AUTH_API + '/auth/login') as string

export type Credentials = { username: string; password: string }

export const useSignin = (): UseMutationResult<AxiosResponse, unknown, Credentials, unknown> => {
  const navigate = useNavigate()
  const signin = useMutation(
    async (userInfo: Credentials) => {
      return axios.post(AUTH_URL, userInfo)
    },
    {
      onSuccess: (response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        navigate('/transactions')
      },
      onError: () => {
        navigate('/')
      },
    }
  )
  return signin
}

export default useSignin
