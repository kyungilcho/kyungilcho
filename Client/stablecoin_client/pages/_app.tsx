import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/layouts/Layout';
import {StateProvider} from '../context/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  )
}

export default MyApp
