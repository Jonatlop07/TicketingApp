import buildClient from '../api/build_client'
import https from 'https'

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in!</h1>
  ) : (
    <h1>You are NOT signed in!</h1>
  )
}

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context)
  const httpsAgent = new https.Agent({
    requestCert: false,
    rejectUnauthorized: false
  })
  const { data } = await client.get('/api/users/currentuser', { httpsAgent })
  return data
}

export default LandingPage
