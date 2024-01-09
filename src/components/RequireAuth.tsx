import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      return children
    }
  } catch (error) {
    console.log('checkToken : ', error)
  }
  return <Navigate to="/" />
}
