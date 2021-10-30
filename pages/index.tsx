import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Box, Flex } from "@chakra-ui/react"

const Home: NextPage = () => {
    return (
        <div>
    <Head>
      <title>MetaPass</title>
    </Head>

    <Box m={2} p={2} >
      <Flex justifyContent="center" alignItems="center">
        <Heading>MetaPass</Heading>
      </Flex>
    </Box>

    </div>
    )
}

export default Home