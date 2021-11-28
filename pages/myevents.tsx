import { useEffect, useContext, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/Metapass.json'
import { walletContext } from '../utils/walletContext'
import { Box, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import EventWidget from '../components/EventWidget'
declare const window: any

// depricated imports (might need later)
// import EventLinks from '../components/EventLinks'
// import {
//     doc,
//     getDoc,
//     db,
//     updateDoc,
//     collection,
//     firebase,
// } from '../utils/firebase'

const MyEvents = () => {
    let windowType
    let metapass

    const [wallet] = useContext(walletContext)
    const [link, setLink] = useState(null)
    // const [event, setEvent] = useState(null)

    // useEffect(() => {
    //     const fetchDataofwalletaddressfromfirebase = async () => {
    //         const docRef = doc(db, 'users', wallet.address)
    //         const docSnap = await getDoc(docRef)
    //         if (docSnap.exists) {
    //             const data = docSnap.data()
    //             setEvent(data)
    //         } else {
    //             setEvent(null)
    //         }
    //     }
    //     fetchDataofwalletaddressfromfirebase()
    // }, [wallet.address])
    // console.log(wallet)

    useEffect(() => {
        const getSecrets = async () => {
            if (typeof window !== 'undefined') {
                if (wallet.address) {
                    windowType = window
                    const contractAddress =
                        '0x05ee02512Be6394C72743e6B131Ce5B39E875C67'
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
                            <EventWidget link={link} />
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
