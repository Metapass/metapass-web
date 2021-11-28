import { useState } from 'react'
import crypto from 'crypto-js'
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
    Button,
} from '@chakra-ui/react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { MdCopyAll } from 'react-icons/md'

const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
}

function EventWidget({ link }: any) {
    const [decLink, setDecLink] = useState(null)
    const { hasCopied, onCopy } = useClipboard(decLink)
    const copyClick = async (str) => {
        let dec = await crypto.AES.decrypt(
            str,
            process.env.NEXT_PUBLIC_SECRET_KEY
        )
        setDecLink(dec.toString(crypto.enc.Utf8))
        onCopy()
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            direction="column-reverse"
        >
            {link.length != 0 ? (
                link.map((el, idx) => {
                    return (
                        <Box
                            key={idx}
                            m={2}
                            bg={'gray.800'}
                            maxW="sm"
                            borderWidth="1px"
                            rounded="lg"
                            shadow="lg"
                            position="relative"
                        >
                            <Flex
                                mt="1"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box
                                    fontSize="2xl"
                                    fontWeight="semibold"
                                    lineHeight="tight"
                                    isTruncated
                                    p={4}
                                >
                                    {el.title}
                                </Box>
                                <Button
                                    mx={2}
                                    onClick={(e) => {
                                        copyClick(el.encryptedLink)
                                    }}
                                >
                                    Copy Link
                                </Button>
                            </Flex>
                        </Box>
                    )
                })
            ) : (
                <div>You don't have any events</div>
            )}
        </Flex>
    )
}

export default EventWidget
