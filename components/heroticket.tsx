import { Image } from '@chakra-ui/react'

const HeroTicket = () => {
    return (
        <Image
            height={{ base: '45rem', md: '80vh' }}
            mr={{ md: '5rem', base: 0 }}
            mt={{ base: 12 }}
            src="https://res.cloudinary.com/dev-connect/image/upload/v1637080046/img/hero_tick_ggsylf.png"
            alt="Hero Ticket"
        />
    )
}
export default HeroTicket
