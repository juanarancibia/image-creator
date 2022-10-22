/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'styles/tailwind.css'
import Layout from 'components/Layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
