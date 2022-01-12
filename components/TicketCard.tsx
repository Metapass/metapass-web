import {
    Flex,
    Box,
    Image,
    Text,
    Avatar,
    Heading,
    Button,
    Skeleton,
    SkeletonText,
    SkeletonCircle,
} from '@chakra-ui/react'

import Link from 'next/link'

export default function TicketCard({ ticket }: any) {
    return true ? (
        <Box
            m={4}
            w="240.17px"
            h="440.17px"
            shadow="lg"
            borderRadius="14px"
            bgColor="rgba(18, 30, 73, 0.71)"
            border="3.2px solid rgba(18, 30, 73, 0.71)"
            overflow="hidden"
        >
            {/* {isLoading ? (
                <Center w="full" h="123px">
                    <Spinner size="sm" />
                </Center>
            ) : null} */}
            <Skeleton isLoaded={ticket.image ? true : false}>
                <Image
                    w="full"
                    h="123px"
                    fit="cover"
                    objectPosition="center"
                    src={ticket.image}
                    alt="ticket image"
                    loading="eager"
                />
            </Skeleton>
            <SkeletonCircle
                size="45px"
                mx={2}
                transform="translateY(-30px)"
                isLoaded={true}
            >
                <Avatar
                    transform="translateY(-10px)"
                    name="John Doe"
                    size="md"
                    border="3px solid rgba(18, 30, 73, 0.71)"
                    // borderColor=""
                    mx={2}
                    src={`https://avatars.dicebear.com/api/pixel-art-neutral/${ticket.eventOwner}.svg
                    `}
                />
            </SkeletonCircle>

            <Box px={4} pb={4}>
                <SkeletonText isLoaded={ticket.title ? true : false}>
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
                        {ticket.title}
                    </Heading>
                </SkeletonText>
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
                        {ticket.eventOwner}{' '}
                    </Text>
                </Flex>
                <Text
                    fontSize="14px"
                    lineHeight="16.42px"
                    fontWeight="400"
                    letterSpacing="0.02em"
                    color="rgba(255, 255, 255, 0.46)"
                    fontFamily="Product Sans"
                >
                    {ticket.description}
                </Text>
                <Flex
                    justify="center"
                    bgColor="rgba(255, 255, 255, 0.13)"
                    mt={4}
                    p={2}
                    mx={-6}
                    transform="translateY(50%)"
                >
                    <Text
                        fontSize="14px"
                        bgClip="text"
                        fontWeight="700"
                        bgGradient="linear(to-br,rgba(227, 132, 150, 1),rgba(203, 141, 255, 1))"
                        lineHeight="117.3%"
                        mr={2}
                    >
                        {ticket.occupiedSeats}/{ticket.seats}
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
                    <Link href={`/event/${ticket.docId}`}>
                        <Button
                            variant="unstyled"
                            bgSize="contain"
                            width="100%"
                            transform="translateY(50%)"
                            bgImage={
                                true
                                    ? 'https://res.cloudinary.com/dev-connect/image/upload/v1637231444/img/buy_now_b2t26i.svg'
                                    : 'https://res.cloudinary.com/dev-connect/image/upload/v1637233007/img/sold_out_we8fxd.svg'
                            }
                            bgRepeat="no-repeat"
                            bgColor="transparent"
                        ></Button>
                    </Link>
                </Flex>
            </Box>
        </Box>
    ) : (
        <> </>
    )
}
