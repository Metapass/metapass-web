import type { NextPage } from 'next'
import Head from 'next/head'
import { Text, Box, Flex, Button } from "@chakra-ui/react"
import { ethers } from 'ethers'
import abi from '../utils/Metapass.json'
import dynamic from 'next/dynamic'

declare const window: any

const Home: NextPage = () => {

    const mintTicket = async () => {
        const contractAddress = '0xD026d2732EFA940080e178ef75557b19df2E47EA';
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        const metapass = new ethers.Contract(
            contractAddress,
            abi.abi,
            signer
        )

        let txn = await metapass.getTix("0x4006c21a130d70000f59e009e4f81db18eb1ef00", "{'name': 'Daksh's Party', 'description': 'An amazing house party!', 'image': 'https://i.imgur.com/QCns31F.jpeg'}", { value: ethers.utils.parseEther('0.01') })
        await txn.wait();
        console.log("Txn completed!")
    }

    return (
        <div>
      <Head>
        <title>MetaPass</title>
      </Head>

      <Box m={2} p={2} >
        <Flex justifyContent="center" alignItems="center">
          <Text>Make amazing NFTs for your events</Text>
          <Button onClick={mintTicket}>Mint NFT Ticket</Button>
        </Flex>
      </Box>

    </div>
    )
}

export default Home