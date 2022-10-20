import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/layouts/Layout';
import {StateProvider} from '../context/index'
import { AccountListProvider } from '../context/AccountList';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountListProvider>
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
    </AccountListProvider>
  )
}

export default MyApp
