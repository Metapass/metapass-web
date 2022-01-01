import { Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Search from '../components/Search'
import React from 'react'
import TicketCard from '../components/TicketCard'
const Explore: NextPage = () => {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        async function fetchData() {
            setTickets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        }
        fetchData()
    }, [])
    return (
        <>
            <Head>
                <title>Explore | Metapass</title>
            </Head>

            <Flex
                flexDirection="column"
                // visibility={['hidden', 'hidden', 'hidden', 'visible']}
                //alignContent="center"
            >
                <Box alignSelf="center">
                    <Search />
                </Box>
                <Flex
                    alignSelf="center"
                    justifyContent="center"
                    flexWrap={['nowrap', 'wrap', 'wrap', 'wrap']}
                    p={[4, 4, 4, 4]}
                    m={[4, 4, 4, 4]}
                >
                    {tickets.map((ticket, index) => (
                        <TicketCard key={index} ticket={ticket} />
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

export default Explore
