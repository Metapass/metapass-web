import { Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import Search from '../components/Search'
import React from 'react'
import TicketCard from '../components/TicketCard'
import { db, collection, limit, getDocs, query } from '../utils/firebase'

declare const window: any

const Explore: NextPage = () => {
    const [tickets, setTickets] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [searchTickets, setSearchTickets] = useState([])

    useEffect(() => {
        async function fetchData() {
            const ref = await collection(db, 'events')
            let q = query(ref, limit(10))
            let snp = await getDocs(q)
            snp.docs.forEach((doc) => {
                setTickets((prev) => [
                    ...prev,
                    {
                        ...doc.data(),
                        docId: doc.id,
                    },
                ])
            })
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (searchKey.length > 0) {
            const filteredTickets = tickets.filter((ticket) => {
                return ticket.title
                    .toLowerCase()
                    .includes(searchKey.toLowerCase())
            })
            setSearchTickets(filteredTickets)
            console.log(filteredTickets)
        }
    }, [searchKey, tickets]) // eslint-disable-line

    return (
        <>
            <Head>
                <title>explore | metapass</title>
            </Head>

            <Box>
                <Flex flexDirection="column">
                    <Box mt={['2rem', '0', '0', '0']} alignSelf="center">
                        <Search tickets={tickets} setSearchKey={setSearchKey} />
                    </Box>
                    <Flex
                        alignSelf="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        direction="row"
                        p={[4, 4, 4, 4]}
                        m={[4, 4, 4, 4]}
                        w={{ md: 'container.xl', base: '3xl' }}
                    >
                        {searchKey.length > 0
                            ? searchTickets.map((ticket, index) => (
                                  <TicketCard
                                      key={`ticket-${index}`}
                                      ticket={ticket}
                                  />
                              ))
                            : tickets.map((ticket: Object, index) => (
                                  <TicketCard key={index} ticket={ticket} />
                              ))}
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Explore
