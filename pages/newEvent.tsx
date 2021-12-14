import { Flex, Box, Input, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/MetaStorage.json'
import Head from 'next/head'

declare const window: any

const newEvent = () => {
    let provider
    let signer
    const contractAddress = '0x7A154730e7c3878cC17102556d9A8373F764E99c'
    useEffect(() => {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner()
    }, [])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('image')
    const [seats, setSeats] = useState(0)
    const [link, setLink] = useState('')

    const createEvent = async () => {
        const metapass = new ethers.Contract(contractAddress, abi.abi, signer)

        let txn = await metapass.createEvent(
            title,
            price,
            description,
            image,
            seats,
            0,
            link
        )

        await txn.wait()

        metapass.on('eventCreated', (res) => {
            console.log(res)
        })
    }

    return (
        <Box p={4}>
            <Head>
                <title>create an event || metapass</title>
            </Head>
            <Flex direction="column">
                <Input
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    m={2}
                />
                <Input
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    m={2}
                />
                <Input
                    placeholder="Price"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    m={2}
                />
                <Input
                    placeholder="Image"
                    onChange={(e) => setImage(e.target.value)}
                    m={2}
                />
                <Input
                    placeholder="Seats"
                    onChange={(e) => setSeats(parseInt(e.target.value))}
                    m={2}
                />
                <Input
                    placeholder="Link"
                    onChange={(e) => setLink(e.target.value)}
                    m={2}
                />
                <Button onClick={createEvent} m={2}>
                    Create Event
                </Button>
            </Flex>
        </Box>
    )
}

export default newEvent
