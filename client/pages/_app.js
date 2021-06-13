import 'bootstrap/dist/css/bootstrap.css'
import https from 'https'
import buildClient from '../api/build_client'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>Header {currentUser.email}</h1>
      <Component {...pageProps} />
    </div>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const httpsAgent = new https.Agent({
    requestCert: false,
    rejectUnauthorized: false
  })
  const { data } = await client.get('/api/users/currentuser', { httpsAgent })

  let pageProps = {}
  if (appContext.Component.getInitialProps)
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)

  return {
    pageProps,
    ...data
  }
}

export default AppComponent
