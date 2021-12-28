import type { NextPage } from 'next'
import Head from 'next/head'
import HeroText from '../components/herotext'
import { Text, Flex, Button, Image, Link } from '@chakra-ui/react'
import HeroTicket from '../components/heroticket'
import splitbee from '@splitbee/web';
import { useEffect } from 'react';

const Home: NextPage = () => {
    useEffect(() => {
        splitbee.track("Land");
    })

    return (
        <Flex flexDirection="column">
            <Head>
                <title>MetaPass</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Flex direction={{ md: 'row', base: 'column-reverse' }}>
                <Flex
                    direction="column"
                    justifyContent={'center'}
                    alignItems={'center'}
                    mr="2rem"
                >
                    <Flex>
                        <HeroText />
                    </Flex>
                    <Text
                        w="45rem"
                        ml="4rem"
                        fontSize={{ md: '24px', base: '3rem' }}
                        style={{ fontFamily: "'PT Sans', sans-serif" }}
                        letterSpacing="2%"
                        lineHeight={{ md: '2rem', base: '3rem' }}
                        color="rgba(255, 255, 255, 0.81)"
                    >
                        Metapass allows you to create and share events with your
                        audience. Tickets are distributed as ERC721 NFT-tokens
                        after it's bought with $MATIC.
                    </Text>
                    <Link href="/create">
                        <Button
                            mt={{ base: 4 }}
                            mb={{ base: 10 }}
                            bgRepeat="no-repeat"
                            w="217.89px"
                            bgColor="transparent"
                            left="-14.5rem"
                            _hover={{
                                bg: 'transparent',
                                bgRepeat: 'no-repeat',
                                transform: 'scale(1.1)',
                                bgImage:
                                    'https://res.cloudinary.com/dev-connect/image/upload/v1636468144/svgs/getstarted_auqixd.svg',
                            }}
                            bgImage="https://res.cloudinary.com/dev-connect/image/upload/v1636468144/svgs/getstarted_auqixd.svg"
                        ></Button>
                    </Link>
                </Flex>
                <Flex justifyContent="center" alignItems={'center'}>
                    <HeroTicket />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home