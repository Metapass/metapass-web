import { useEffect, useContext, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/Metapass.json'
import { walletContext } from '../utils/walletContext'
import { Box, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import EventLinks from '../components/EventLinks'

declare const window: any

const MyEvents = () => {
    let windowType
    let metapass

    const [wallet] = useContext(walletContext)
    const [link, setLink] = useState(null)

    useEffect(() => {
        const getSecrets = async () => {
            if (typeof window !== 'undefined') {
                if (wallet.address) {
                    windowType = window
                    const contractAddress =
                        '0xCC74F175f169B1407De9268d685dCdC02f175B2C'
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    )
                    const signer = provider.getSigner()
                    metapass = new ethers.Contract(
                        contractAddress,
                        abi.abi,
                        signer
                    )

                    let txn = await metapass.getEventDetails()

                    setLink(txn)
                } else {
                    console.log('connect dat wallet eh')
                }
            }
        }
        getSecrets()
    }, [wallet])

    return (
        <Box p={4}>
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                <Head>
                    <title>my events // metapass</title>
                </Head>
                {wallet.address ? (
                    <Flex
                        direction="column"
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {link ? (
                            <EventLinks link={link} />
                        ) : (
                            <div>loading...</div>
                        )}
                    </Flex>
                ) : (
                    <div>Connect Wallet to view your events</div>
                )}
            </Flex>
        </Box>
    )
}

export default MyEvents
