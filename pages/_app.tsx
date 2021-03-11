import { AppProps } from 'next/app'
import '../styles/index.css'
import { Provider } from 'next-auth/client'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Provider session={pageProps.session}><Component {...pageProps} /></Provider>
}
