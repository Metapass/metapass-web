import { useState } from 'react'
import crypto from 'crypto-js'
import { Flex, Box, useClipboard, Button } from '@chakra-ui/react'

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
