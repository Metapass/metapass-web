import {
    Box,
    Flex,
    Button,
    Heading,
    Text,
    Image,
    Skeleton,
} from '@chakra-ui/react'
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
        const contractAddress = '0xCC74F175f169B1407De9268d685dCdC02f175B2C'
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
                event.image,
                event.date
            )

            let metadata = {
                name: event.title,
                description: `NFT Ticket for ${event.title}`,
                image: img,
                properties: {
                    'Ticket Number': parseInt(event.occupiedSeats) + 1,
                },
            }

            console.log(ethers.utils.parseEther(`${event.fee}`)._hex.toString())

            try {
                let txn = await metapass.getTix(
                    event.eventOwner,
                    JSON.stringify(metadata),
                    event.manual,
                    event.title,
                    {
                        value: await ethers.utils.parseEther(`${event.fee}`),
                    }
                )

                await txn.wait()

                console.log('Txn completed!', txn)

                if (id) {
                    let docRef: any = doc(db, 'events', id.toString())
                    updateDoc(docRef, {
                        occupiedSeats: event.occupiedSeats + 1,
                    }).then((r) => console.log('updated backend'))
                    let docRef2: any = doc(db, 'users', wallet.address)
                    updateDoc(docRef2, {
                        event: event.eventOwner,
                        image: img,
                        title: event.title,
                        fee: event.fee,
                    })
                        .then((r) => console.log('updated doc'))
                        .catch((e) => {
                            console.log(e)
                        })
                } else {
                    console.log('no id found')
                }

                toast.success('NFT Sent to your wallet! ✨')
                setInTxn(false)
            } catch (e) {
                console.log(e)
                setInTxn(false)
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
                {event ? (
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
                            isLoaded={event.image != null ? true : false}
                        >
                            <Image
                                rounded="md"
                                src={event.image}
                                w={'600px'}
                                alt={'img'}
                            />
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
                                mb="5"
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
                            <hr />
                            <Text
                                fontStyle="normal"
                                my="2"
                                mx={4}
                                fontSize="30px"
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
                                Tickets Sold: {event.occupiedSeats}/
                                {event.seats}
                            </Text>
                            <Text
                                mx={4}
                                mb={2}
                                fontSize={'25px'}
                                // style={{ fontFamily: "'PT Sans', sans-serif" }}
                                fontFamily="Inter"
                            >
                                <style jsx>{`
                                    @font-face {
                                        font-family: 'Inter';
                                        src: url('https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900');
                                    }
                                    .hero-text {
                                        font-family: 'Inter';
                                    }
                                `}</style>
                                <DateComponent date={event.date} />
                            </Text>
                            <hr />
                            <Text
                                w="545.25px"
                                ml="1rem"
                                mt="1rem"
                                mb={2}
                                fontSize="25px"
                                style={{ fontFamily: "'PT Sans', sans-serif" }}
                                letterSpacing="0.02em"
                                lineHeight="29px"
                                fontStyle="normal"
                                color="rgba(255, 255, 255, 0.81)"
                            >
                                {event.description}
                            </Text>
                            <Text mx={4} mt={2} mb={-1} fontSize="22px">
                                $MATIC {event.fee}
                            </Text>
                            <Button
                                p={4}
                                width="100%"
                                m={'1rem'}
                                bgImage={
                                    mintable
                                        ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                        : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg'
                                }
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
                                    bgImage: mintable
                                        ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                        : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                                }}
                                _active={{
                                    bg: 'transparent',
                                    bgRepeat: 'no-repeat',
                                    transform: 'scale(1.1)',
                                    outline: 'none',
                                    bgImage: mintable
                                        ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                        : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                                }}
                            ></Button>
                        </Flex>
                    </Flex>
                ) : null}
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
    return (
        <span>
            {parsedDate.date()} {monthArray[parsedDate.month()]},{' '}
            {parsedDate.year()}
        </span>
    )
}

export default ID
