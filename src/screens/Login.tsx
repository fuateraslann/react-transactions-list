import { useEffect } from 'react'
import { Button, Card, Form, Input, Row, message } from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined'
import { useSignin } from 'hooks'

const FormItem = Form.Item

const Login = () => {
  const { mutate: signin, isError: isErrorSignin, isLoading } = useSignin()

  useEffect(() => {
    if (isErrorSignin) message.error('Please make sure to enter correct credentials and try again.')
  }, [isErrorSignin])

  const onFinish = (values: any) => {
    signin(values)
  }
  return (
    <Row
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card style={{ textAlign: 'center' }}>
        <h1> Login</h1>
        <Form onFinish={onFinish}>
          <FormItem rules={[{ required: true, message: 'Username required!' }]} name={'username'}>
            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'UserName'} />
          </FormItem>
          <FormItem
            rules={[
              {
                required: true,
                message: 'Password Required!',
              },
            ]}
            name="password"
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={'password'}
            />
          </FormItem>
          <FormItem>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Login
            </Button>
          </FormItem>
        </Form>
      </Card>
    </Row>
  )
}

export default Login
