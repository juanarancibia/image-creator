/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'styles/tailwind.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-grow flex-col my-6">
      <main className="">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
export default MyApp
