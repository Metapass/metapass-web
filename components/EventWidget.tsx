import React from 'react'

import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    useClipboard,
} from '@chakra-ui/react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { MdCopyAll } from 'react-icons/md'
import { Decipher, privateDecrypt, publicDecrypt } from 'crypto'
const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
}

function EventWidget({ link, event }: any) {
    console.log(link)
    const { hasCopied, onCopy } = useClipboard(link[0].encryptedLink)
    return (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
            >
                {data.isNew && (
                    <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.200"
                    />
                )}

                <Image
                    src={
                        event
                            ? event.image
                            : 'https://avatars.githubusercontent.com/u/93331018?s=200&v=4'
                    }
                    alt={`Picture of ${data.name}`}
                    roundedTop="lg"
                />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        {data.isNew && (
                            <Badge
                                rounded="full"
                                px="2"
                                fontSize="0.8em"
                                colorScheme="red"
                            >
                                New
                            </Badge>
                        )}
                    </Box>
                    <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                    >
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {link[0] ? link[0].title : null}
                        </Box>
                        <Tooltip
                            label="Copy link to event"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}
                        >
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon
                                    as={MdCopyAll}
                                    onClick={onCopy}
                                    h={7}
                                    w={7}
                                    alignSelf={'center'}
                                />
                            </chakra.a>
                        </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                        <Box
                            fontSize="2xl"
                            color={useColorModeValue('gray.800', 'white')}
                        >
                            <Box
                                as="span"
                                p={0.5}
                                color={'gray.600'}
                                fontSize="lg"
                            >
                                $MATIC
                            </Box>
                            {event ? event.fee : null}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default EventWidget
