import { useEffect, useContext, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/Metapass.json'
import { walletContext } from '../utils/walletContext'
import { Box, Flex, Text } from '@chakra-ui/react'
import crypto from 'crypto-js'
import Head from 'next/head'
import Link from 'next/link'

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

    const decryptLinks = (str) => {
        let dec = crypto.AES.decrypt(str, process.env.NEXT_PUBLIC_SECRET_KEY)
        return dec.toString(crypto.enc.Utf8)
    }

    const renderLinks = () => {
        return link.map((el, idx) => (
            <div key={idx}>
                <Link href={decryptLinks(el.encryptedLink)}>{el.title}</Link>
            </div>
        ))
    }

    return (
        <Box p={4}>
            <Head>
                <title>my events // metapass</title>
            </Head>
            <Text variant="primary">
                Click on title to open the desired instructions
            </Text>
            {wallet.address ? (
                <Flex
                    direction="column"
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {link ? (
                        <Flex>{renderLinks()}</Flex>
                    ) : (
                        <div>loading...</div>
                    )}
                </Flex>
            ) : (
                <div>Connect Wallet</div>
            )}
        </Box>
    )
}

export default MyEvents
