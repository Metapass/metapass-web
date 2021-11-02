import type { NextPage } from 'next'
import Head from 'next/head'
import { Text, Box, Flex, Button } from "@chakra-ui/react"


declare const window: any

const Home: NextPage = () => {

    return (
        <>
      <Head>
        <title>MetaPass</title>
      </Head>

      <Box m={2} p={2} >
        <Flex justifyContent="center" alignItems="center">
          <Text>Make amazing NFTs for your events</Text>
        </Flex>
      </Box>

    </>
    )
}

export default Home