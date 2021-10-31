// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools";

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
        bg: mode("gray.100", "#141214")(props),
      },
    }),
  },
});
export default theme