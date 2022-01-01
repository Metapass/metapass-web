import { Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Search from '../components/Search'
const Explore: NextPage = () => {
    return (
        <>
            <Head>
                <title>Explore | Metapass</title>
            </Head>

            <Flex
                flexDirection="column"
                visibility={['hidden', 'hidden', 'hidden', 'visible']}
                //alignContent="center"
            >
                <Box alignSelf="center">
                    <Search />
                </Box>
                <Box>
                    <h1>Explore</h1>
                </Box>
            </Flex>
        </>
    )
}

export default Explore
