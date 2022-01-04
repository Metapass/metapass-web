import { Box, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import Search from '../components/Search'
import { walletContext } from '../utils/walletContext'
import React from 'react'
import TicketCard from '../components/TicketCard'
import { db, collection, getDocs, getDocsFromCache } from '../utils/firebase'
declare const window: any
const Explore: NextPage = () => {
    const [tickets, setTickets] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [searchTickets, setSearchTickets] = useState([])
    // let windowType
    // let metapass

    const [wallet] = useContext(walletContext)
    // const [link, setLink] = useState(null)
    useEffect(() => {
        async function fetchData() {
            if (typeof window !== 'undefined') {
                if (wallet.address) {
                    const ref = await collection(db, 'events')
                    //const ticketsSnap = await ticketsRef.get()
                    let snp = await getDocsFromCache(ref)
                    snp.docs.forEach((doc) => {
                        setTickets((prev) => [...prev, doc.data()])
                    })
                } else {
                    console.log('connect dat wallet eh')
                }
            }
        }
        fetchData()
    }, [wallet])
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
                <title>Explore | Metapass</title>
            </Head>

            <Flex
                flexDirection="column"
                // visibility={['hidden', 'hidden', 'hidden', 'visible']}
                //alignContent="center"
            >
                <Box mt={['2rem', '0', '0', '0']} alignSelf="center">
                    <Search tickets={tickets} setSearchKey={setSearchKey} />
                </Box>
                <Flex
                    alignSelf="center"
                    justifyContent="center"
                    flexWrap="wrap"
                    p={[4, 4, 4, 4]}
                    m={[4, 4, 4, 4]}
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
        </>
    )
}

export default Explore
