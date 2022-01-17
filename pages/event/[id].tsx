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
import splitbee from '@splitbee/web'

declare const window: any

function ID() {
    const [wallet] = useContext(walletContext)
    const [render, setRender] = useState(true)
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
                    setRender(false)
                }
            } else {
                console.log('id not yet initialized')
            }
        }

        fetchData()
        splitbee.track('Ticket Land', {
            id: id as string,
        })
    }, [id])

    const mintTicket = async () => {
        const contractAddress = process.env.CONTRACT_ADDRESS
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

                let tokenIdTxn = await metapass.getLastTokenId()
                let tokenId = ethers.BigNumber.from(tokenIdTxn._hex).toNumber()
                const opensea = `https://opensea.io/assets/matic/0xd9b5a4efe3f6e43c3b437b495ddb8668a3a3258d/${tokenId}`

                if (id) {
                    let docRef: any = doc(db, 'events', id.toString())
                    updateDoc(docRef, {
                        occupiedSeats: event.occupiedSeats + 1,
                    }).then((r) => console.log('updated backend'))
                } else {
                    console.log('no id found')
                }
                splitbee.track('Buy Ticket', {
                    id: id as string,
                })
                toast.success('NFT Sent to your wallet! ✨')
                toast.success('Redirecting to your NFT on opensea')
                setTimeout(() => {
                    router.push(opensea)
                }, 5000)
                setInTxn(false)
            } catch (e) {
                toast('JSON RPC error, contact @metapassHQ on twitter for help')
                console.log(e)
                setInTxn(false)
            }
        } else {
            toast('Please connect wallet first')
        }
    }

    if (!render) {
        return <div>The requested ID doesn't exist</div>
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
                        flexDirection={{ md: 'row', base: 'column' }}
                        justifyContent="flex-start"
                        alignContent="center"
                        ml={{ md: '15%', base: '10%' }}
                        mt={'5%'}
                    >
                        <Head>
                            <title>{event.title + ' // metapass'}</title>
                            <meta
                                name="description"
                                content="visit the link to buy tickets for the event. your NFT ticket waits for you."
                            />
                        </Head>
                        <Skeleton
                            w="700px"
                            marginRight="20px"
                            isLoaded={event.image != null ? true : false}
                        >
                            <Image
                                mb={{ base: '2rem' }}
                                rounded="md"
                                src={event.image}
                                w={'600px'}
                                alt={'img'}
                            />
                        </Skeleton>
                        <Flex
                            flexDirection="column"
                            justifyContent="space-evenly"
                            m={'5%'}
                            flex={1}
                        >
                            <Heading
                                ml={{ md: '2rem', base: 0 }}
                                mt="-1rem"
                                w="100%"
                                mb="5"
                                fontSize={{ md: '3rem', base: '4rem' }}
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
                                mt={{ base: '1.5rem', md: '1rem' }}
                                mx={{ md: 4, base: 0 }}
                                fontSize={{ md: '2rem', base: '2.4rem' }}
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
                                mx={{ md: 4, base: 2 }}
                                mb={2}
                                fontSize={{ md: '1rem', base: '2rem' }}
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
                                fontSize={{ md: '1.5rem', base: '2.5rem' }}
                                style={{ fontFamily: "'PT Sans', sans-serif" }}
                                letterSpacing="0.02em"
                                lineHeight="29px"
                                fontStyle="normal"
                                color="rgba(255, 255, 255, 0.81)"
                            >
                                {event.description}
                            </Text>
                            <Text
                                mx={4}
                                mt={2}
                                mb={-1}
                                fontSize={{ base: '1.5rem', md: '1.5rem' }}
                            >
                                $MATIC {event.fee}
                            </Text>
                            <Button
                                p={6}
                                width={'100%'}
                                m={'1rem'}
                                px={{ base: 10 }}
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
