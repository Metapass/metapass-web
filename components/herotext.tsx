
import { Text, Box, Flex, Button, Image, Heading } from "@chakra-ui/react"

const HeroText = () => {
    const star = "https://res.cloudinary.com/dev-connect/image/upload/v1636454924/svgs/stra_p8dqyd.svg"
    return (
        <Heading
         flex="1"
         ml="2rem"
         mt="-5rem"
         fontSize="2.5rem"
         alignSelf="center"
            className="hero-text"
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
    REIMAGINING EVENTS
        </Heading>
    )
}
export default HeroText;