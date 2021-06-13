import { useEffect } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use_request'

const SignOut = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  })

  useEffect(() => {
    doRequest()
  }, [])

  return <div>Signin you out...</div>
}

export default SignOut
