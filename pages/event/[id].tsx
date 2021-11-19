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
                event.displayImage
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

        <Flex
            direction="column"
            justifyContent={'center'}
            alignItems="flex-start"
        >
            <Skeleton isLoaded={event != null ? true : false}>
                {
                    event ? (
                        <Flex
                            flexDirection="row"
                            justifyContent="flex-start"
                            alignContent="center"
                            ml={'15%'}
                            mt={'5%'}
                        >
                            <Skeleton
                                w="700px"
                                marginRight="20px"
                                isLoaded={event.image != null ? true : false}>
                                <Image
                                    
                                    src={event.image}
                                    w={'600px'}
                                    alt={"img"} />

                            </Skeleton>
                            <Head>
                                <title>{event.title + ' // metapass'}</title>
                            </Head>
                            <Flex
                                flexDirection="column"
                                justifyContent="space-evenly"
                                m={'5%'}
                                flex={1}
                            
                            >
                                <Heading
                                    
                                    ml="2rem"
                                    mt="-1rem"
                                    w="100%"
                                    fontSize="50px"
                                    lineHeight="89.3%"
                                    alignSelf="center"
                                    className="hero-text"
                                    fontFamily="Azonix"
                                    color="white"
                                >
                                    <style jsx>{`
                @font-face {
                    font-family: 'Azonix';
                    src: url('/fonts/Azonix.otf');
                }
                .hero-text {
                    font-family: 'Azonix';
                }
            `}</style>
                                    {event.title}
                                </Heading>




                                
                                <Text
                    w="545.25px"
                    ml="1rem"
                    mt="1rem"
                    // position="absolute"
                    // top="420.5px"
                    // left="80px"
                    fontSize="25px"
                    style={{ fontFamily: "'PT Sans', sans-serif" }}
                    letterSpacing="0.02em"
                    lineHeight="29px"
                    fontStyle="normal"
                    color="rgba(255, 255, 255, 0.81)"
                >
                    {event.description}
                </Text>
                <Text
                    w="545.25px"
                 fontStyle="normal"
                    ml="1rem"
                    mt="2rem"
                    // position="absolute"
                    // top="420.5px"
                    // left="80px"
                    fontSize="25px"
                    style={{ fontFamily: "'PT Sans', sans-serif" }}
                    letterSpacing="0.02em"
                    lineHeight="29px"
                    fontWeight="bold"
                    color="rgba(255, 255, 255, 0.81)"
                >
                    Remaining Tickets
                </Text>
                <Text
                    w="545.25px"
                 fontStyle="normal"
                    ml="1rem"
                    mt="1rem"
                    mb="1.5rem"
                    // position="absolute"
                    // top="420.5px"
                    // left="80px"
                    fontSize="45px"
                    fontFamily="Azonix"
                    
                    lineHeight="40px"
                    fontWeight="normal"
                    color="rgba(255, 255, 255, 0.81)"
                >
                    <style jsx>{`
                @font-face {
                    font-family: 'Azonix';
                    src: url('/fonts/Azonix.otf');
                }
                .hero-text {
                    font-family: 'Azonix';
                }
            `}</style>
                    0{event.occupiedSeats}/{event.seats}
                </Text>
                                <Text m={2}>
                                    <DateComponent date={event.date} />
                                </Text>
                                <Button
                                    p={4}
                                    width="100%"
                                    m={"1rem"}
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
                                        outline: 'none',
                                        bgImage: mintable ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg' : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                                    }}
                                    _active={{
                                        bg: 'transparent',
                                        bgRepeat: 'no-repeat',
                                        transform: 'scale(1.1)',
                                        outline: 'none',
                                        bgImage: mintable ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg' : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                                    }}
                                >

                                </Button>
                            </Flex>
                        </Flex>
                    ) : null
                }
            </Skeleton>
        </Flex>

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
