import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools";


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
   			<Component {...pageProps} />
    	</ChakraProvider>
    )
}
export default MyApp