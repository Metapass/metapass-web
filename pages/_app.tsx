import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../utils/theme'
import '@fontsource/inter'
import Layout from '../components/Layout'
import Wallet from '../utils/walletContext'
import { MoralisProvider } from 'react-moralis'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <MoralisProvider
                appId={process.env.NEXT_PUBLIC_APP_ID}
                serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
            >
                <Wallet>
                    <Layout>
                        <ToastContainer />
                        <Component {...pageProps} />
                    </Layout>
                </Wallet>
            </MoralisProvider>
        </ChakraProvider>
    )
}
export default MyApp
