import { Box, Flex, Button, Heading, Text, Image, Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { doc, getDoc, db, updateDoc } from '../../utils/firebase'
import { useEffect, useState, useContext } from 'react'
import { walletContext } from '../../utils/walletContext'
import Head from 'next/head'
import { ticketToIPFS } from '../../utils/ticketToIPFS'
import moment from 'moment'

import { ethers } from 'ethers'
import abi from '../../utils/Metapass.json'

import { toast } from 'react-toastify'

declare const window: any

function ID() {
    const [wallet] = useContext(walletContext)

    const [event, setEvent]: any = useState(null)
    const [mintable, setMintable]: any = useState(false)
    const [inTxn, setInTxn]: any = useState(false)

    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                let docRef: any = doc(db, 'events', id.toString())
                let docSnap: any = await getDoc(docRef)

                if (docSnap.exists()) {
                    setEvent(docSnap.data())
                    if (docSnap.data().seats <= docSnap.data().occupiedSeats) {
                        setMintable(false)
                    } else {
                        setMintable(true)
                    }
                } else {
                    console.log("doc data don't exist")
                }
            } else {
                console.log('id not yet initialized')
            }
        }

        fetchData()
    }, [id])

    const mintTicket = async () => {
        const contractAddress = '0xD026d2732EFA940080e178ef75557b19df2E47EA'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        if (wallet.address) {
            setInTxn(true)
            const metapass = new ethers.Contract(
                contractAddress,
                abi.abi,
                signer
            )

            let img = await ticketToIPFS(
                event.title,
                parseInt(event.occupiedSeats) + 1,
                event.image
            )

            let metadata = {
                name: event.title,
                description: `NFT Ticket for ${event.title}`,
                image: img,
                properties: {
                    'Ticket Number': parseInt(event.occupiedSeats) + 1,
                },
            }

            try {
                let txn = await metapass.getTix(
                    event.eventOwner,
                    JSON.stringify(metadata),
                    { value: ethers.utils.parseEther(`${event.fee}`) }
                )

                await txn.wait()

                console.log('Txn completed!')

                if (id) {
                    let docRef: any = doc(db, 'events', id.toString())
                    updateDoc(docRef, {
                        occupiedSeats: event.occupiedSeats + 1,
                    }).then((r) => console.log('updated backend'))
                } else {
                    console.log('no id found')
                }

                toast.success('NFT Sent to your wallet! ✨')
                setInTxn(false)
            } catch (e) {
                console.log(e)
            }
        } else {
            toast('Please connect wallet first')
        }
    }

    return (
        <Box p={4}>
            <Flex
                direction="column"
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Skeleton isLoaded={event != null ? true : false}>
                    {
                        event ? (
                            <Flex
                                flexDirection="row"
                                justifyContent="space-evenly"
                            >
                                <Skeleton
                                    flex={1}
                                    isLoaded={(event != null && event.image.length > 0) ? true : false}
                                    width="24%"
                                >
                                    <Image src={event != null && event.image ?
                                        event.image
                                        :
                                        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                                    }
                                        width="24%"
                                        alt={"img"} />
                                </Skeleton>
                                <Head>
                                    <title>{event.title + ' // metapass'}</title>
                                </Head>
                                <Heading m={2}>{event.title}</Heading>




                                <Text m={1}>total seats: {event.seats}</Text>
                                <Text m={1}>
                                    total remaining:{' '}
                                    {parseInt(event.seats) -
                                        parseInt(event.occupiedSeats)}
                                </Text>
                                <Text m={2}>
                                    <DateComponent date={event.date} />
                                </Text>
                                <Text m={2}>{event.description}</Text>
                                <Button
                                    p={4}
                                    m={2}
                                    bgImage={mintable ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg' : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg'}
                                    onClick={mintTicket}
                                    isDisabled={!mintable && inTxn}
                                    isLoading={inTxn}
                                    bgRepeat="no-repeat"
                                    bgColor="transparent"
                                    _hover={{
                                        bg: 'transparent',
                                        bgRepeat: 'no-repeat',
                                        transform: 'scale(1.1)',
                                        bgImage: mintable ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg' : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                                    }}
                                    _focus={{
                                        bg: 'transparent',
                                        bgRepeat: 'no-repeat',
                                        transform: 'scale(1.1)',
                                        bgImage: mintable ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg' : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                                    }}
                                >

                                </Button>
                            </Flex>
                        ) : null
                    }
                </Skeleton>
            </Flex>
        </Box>
    )
}

function DateComponent({ date }) {
    const monthArray = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ]
    const parsedDate = moment(date)
    console.log(parsedDate.day())

    return (
        <span>
            {parsedDate.day()} - {monthArray[parsedDate.month()]} -{' '}
            {parsedDate.year()}
        </span>
    )
}

export default ID
