import '../styles/globals.css'
import router from 'next/router'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} router={router}/>
}

export default MyApp