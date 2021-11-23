import crypto from 'crypto-js'
import Link from 'next/link'
import { Text, Heading } from '@chakra-ui/react'

function EventLinks({ link }) {
    const decryptLinks = (str) => {
        let dec = crypto.AES.decrypt(str, process.env.NEXT_PUBLIC_SECRET_KEY)
        return dec.toString(crypto.enc.Utf8)
    }

    return (
        <div>
            <Text fontSize="lg" variant="primary" my={4}>
                *Click on title to open the desired instructions
            </Text>
            {link.map((el, idx) => {
                return (
                    <Heading fontSize="2xl" my={1} key={idx}>
                        <Link href={decryptLinks(el.encryptedLink)}>
                            {el.title}
                        </Link>
                    </Heading>
                )
            })}
        </div>
    )
}

export default EventLinks
