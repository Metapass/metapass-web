import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../utils/theme'
import '@fontsource/inter'
import Layout from '../components/Layout'
import Wallet from '../utils/walletContext'

import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Wallet>
                <Layout>
                    <ToastContainer />
                    <Component {...pageProps} />
                </Layout>
            </Wallet>
        </ChakraProvider>
    )
}
export default MyApp
