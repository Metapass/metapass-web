import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/inter"
import Layout from '../components/Layout'
import Wallet from '../utils/walletContext'

const theme = extendTheme({
    fonts: {
        heading: "Inter",
        body: "Inter",
    },
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    styles: {
        global: (props: any) => ({
            body: {
                color: mode("gray.800", "whiteAlpha.900")(props),
                bg: mode("gray.100", "#141214")(props),
            },
        }),
    },
});

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