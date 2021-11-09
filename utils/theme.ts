// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// 2. Add your color mode config
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
        backgroundImage:`url('https://res.cloudinary.com/dev-connect/image/upload/v1636453687/svgs/Web_UI_aazfro.svg')`
        //bg: mode("gray.50", "rgba(56, 14, 37, 1)")(props),
        //bgGradient:mode("gray.100","linear(to-br,rgba(255, 255, 255, 0.4),rgba(255, 255, 255, 0.1),rgba(47, 104, 249, 1),rgba(144, 39, 234, 1))")(props),
      },
    }),
  },
});
export default theme
