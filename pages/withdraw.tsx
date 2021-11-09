import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { walletContext } from '../utils/walletContext'
import { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import abi from '../utils/Metapass.json'
import Head from 'next/head'

declare const window: any

function Widthdraw() {
    const [wallet] = useContext(walletContext)
    const [balance, setBalance]: any = useState(null)

    let metapass: any

    if (typeof window !== 'undefined') {
        const contractAddress = '0xD026d2732EFA940080e178ef75557b19df2E47EA'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        metapass = new ethers.Contract(contractAddress, abi.abi, signer)
    } else {
        console.log('not in browser yet')
    }

    const getClaims = async () => {
        if (!wallet.address) {
            toast('wallet not connected bro')
        } else {
            let txn = await metapass._claims()
            setBalance(ethers.utils.formatEther(txn._hex))
        }
    }

    useEffect(() => {
        getClaims()
    }, [wallet.address])

    const withdrawFunds = async () => {
        console.log(metapass)
        let txn = await metapass.widthdraw()
        await txn.wait()
        await getClaims()

        toast('Funds transferred to your wallet! 🎉')
    }

    return (
        <Box p={4}>
            <Head>
                <title>withdrawal // metapass</title>
            </Head>
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                {balance ? (
                    <>
                        <Text>
                            Available funds to withdraw is: {balance} MATIC
                        </Text>
                        <Button
                            variant="outline"
                            onClick={withdrawFunds}
                            m={2}
                            p={4}
                        >
                            Withdraw Funds
                        </Button>
                    </>
                ) : (
                    <>
                        {wallet.address ? (
                            <>Loading...</>
                        ) : (
                            <>Wallet not connectd yet :(</>
                        )}
                    </>
                )}
            </Flex>
        </Box>
    )
}

export default Widthdraw
