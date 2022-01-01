import {
    Flex,
    useColorModeValue,
    Box,
    chakra,
    Icon,
    Image,
    Text,
    Avatar,
    Heading,
    Spacer,
    Button,
} from '@chakra-ui/react'

import { MdHeadset, MdLocationOn, MdEmail } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'

export default function TicketCard({ ticket }) {
    return (
        <Box
            m={4}
            w="240.17px"
            h="440.17px"
            bg={useColorModeValue('white', 'gray.800')}
            shadow="lg"
            borderRadius="14px"
            bgColor="rgba(18, 30, 73, 0.71)"
            border="3.2px solid rgba(18, 30, 73, 0.71)"
            overflow="hidden"
        >
            <Image
                w="full"
                h="123px"
                fit="cover"
                objectPosition="center"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
            />

            <Avatar
                transform="translateY(-30px)"
                name="John Doe"
                size="lg"
                border="3px solid rgba(18, 30, 73, 0.71)"
                // borderColor=""
                mx={2}
                src="https://bit.ly/dan-abramov"
            />

            <Box px={4} pb={4}>
                <Heading
                    mt={-4}
                    fontSize="22px"
                    lineHeight="89.3%"
                    fontWeight="400"
                    color="white"
                    mb={1}
                    fontFamily="Azonix"
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
                    Meetup 2022
                </Heading>
                <Flex>
                    <Text
                        letterSpacing="0.02em"
                        lineHeight="117.3%"
                        color="white"
                        fontFamily="Product Sans"
                        fontSize="14px"
                        mr={2}
                    >
                        By{' '}
                    </Text>

                    <Text
                        bgClip="text"
                        letterSpacing="0.02em"
                        lineHeight="117.3%"
                        fontFamily="Product Sans"
                        fontSize="14px"
                        bgGradient="linear(to-br,rgba(224, 91, 73, 1),rgba(236, 59, 123, 1))"
                    >
                        John{' '}
                    </Text>
                </Flex>
                {/* <Flex
                    alignItems="center"
                    mt={4}
                    
                >
                    
                </Flex> */}
                <Text
                    fontSize="14px"
                    lineHeight="16.42px"
                    fontWeight="400"
                    letterSpacing="0.02em"
                    color="rgba(255, 255, 255, 0.46)"
                    fontFamily="Product Sans"
                >
                    Meet the folks behind the A Company. Unlimited snacks and
                    drinks included, networking oppportunity. Dance party ..more
                </Text>
                <Flex
                    justify="center"
                    bgColor="rgba(255, 255, 255, 0.13)"
                    mt={4}
                    p={2}
                    mx={-6}
                >
                    <Text
                        fontSize="14px"
                        bgClip="text"
                        fontWeight="700"
                        bgGradient="linear(to-br,rgba(227, 132, 150, 1),rgba(203, 141, 255, 1))"
                        lineHeight="117.3%"
                        mr={2}
                    >
                        20/100
                    </Text>
                    <Text
                        fontSize="14px"
                        fontWeight="700"
                        color="rgba(255, 255, 255, 0.71)"
                        lineHeight="117.3%"
                        mr={2}
                    >
                        Tickets left
                    </Text>
                </Flex>

                <Flex alignItems="center" pl={2} mt={4} justify="center">
                    <Button
                        variant="unstyled"
                        bgSize="contain"
                        width="100%"
                        bgImage={
                            true
                                ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg'
                        }
                        // onClick={mintTicket}
                        // isDisabled={!mintable && inTxn}
                        // isLoading={inTxn}
                        bgRepeat="no-repeat"
                        bgColor="transparent"
                        _hover={{
                            width: '100%',

                            backgroundSize: 'contain',
                            bgColor: 'transparent',
                            bgRepeat: 'no-repeat',
                            transform: 'scale(1.1)',
                            outline: 'none',
                            bgImage: true
                                ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                        }}
                        _active={{
                            width: '100%',

                            backgroundSize: 'contain',
                            bgColor: 'transparent',
                            bgRepeat: 'no-repeat',
                            transform: 'scale(1.1)',
                            outline: 'none',
                            bgImage: true
                                ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg',
                        }}
                    ></Button>
                </Flex>
            </Box>
        </Box>
    )
}
