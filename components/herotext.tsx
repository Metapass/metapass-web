import { Image, Heading } from '@chakra-ui/react'

const HeroText = () => {
    const star =
        'https://res.cloudinary.com/dev-connect/image/upload/v1636454924/svgs/stra_p8dqyd.svg'
    return (
        <Heading
            flex="1"
            ml="2rem"
            mt="5rem"
            fontSize={{ md: '3.5rem', base: '3.5rem' }}
            alignSelf="center"
            className="hero-text"
            fontFamily="Azonix"
            mb="0rem"
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
            <Image src={star} h={'3rem'} />
            REIMAGINING EVENTS.
        </Heading>
    )
}
export default HeroText
