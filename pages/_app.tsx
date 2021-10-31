import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../utils/theme"
import "@fontsource/inter"
import Layout from '../components/Layout'
import Wallet from '../utils/walletContext'



function MyApp({ Component, pageProps }: AppProps) {

    return (
        <ChakraProvider theme={theme}>
            <Wallet>
                <Layout>
           		    <Component {...pageProps} />
                </Layout>
            </Wallet>
    	</ChakraProvider>
    )
}
export default MyApp