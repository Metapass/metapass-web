import type { NextPage } from 'next'
import Head from 'next/head'
import HeroText from '../components/herotext'
import { Text, Box, Flex, Button, Image } from "@chakra-ui/react"
import HeroTicket from '../components/heroticket'


const Home: NextPage = () => {

  return (
    <Flex
      flexDirection="column"
    >
      <Flex
        justify="space-between"
      >

        <Head>
          <title>MetaPass</title>
        
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet"/>

        </Head>

        <Image src="https://res.cloudinary.com/dev-connect/image/upload/v1636454924/svgs/stra_p8dqyd.svg"
          alt="star"
          flex="3"
          position="absolute"
          alignSelf="center"
          marginTop="-20.5rem"
          marginLeft="1.5rem"
        />

        <HeroText />


        <HeroTicket />
        <Text
        w="646.25px"
        h="70.99px"
        position="absolute"
        top="420.5px"
        left="80px"
        fontSize="24px"
        style={{fontFamily:"'PT Sans', sans-serif;"}}
        letterSpacing="2%"
        lineHeight="28.15px"
        color="rgba(255, 255, 255, 0.81)"
        >
          Metapass allows you to create and share events with your audience. Tickets are distributed as ERC721 NFT-tokens after it's bought with $MATIC.
        </Text>
      </Flex>
      <Button
      bgRepeat="no-repeat"
      w="217.89px"
      bgColor="transparent"
      position="absolute"
      left="90.27px"
      _hover={{
        bg: "transparent",
        bgRepeat: "no-repeat",
        transform: "scale(1.1)",
       bgImage:"https://res.cloudinary.com/dev-connect/image/upload/v1636468144/svgs/getstarted_auqixd.svg"
      }}
      top="540.67px"
      bgImage="https://res.cloudinary.com/dev-connect/image/upload/v1636468144/svgs/getstarted_auqixd.svg"
      ></Button>
      <Flex
        justifyContent="center"
      >
        <Image
          p={5}
          position="absolute"
          bottom="-35"
          w="15%"
          height="15%"
          src="https://res.cloudinary.com/dev-connect/image/upload/v1636466159/svgs/mouse_nlkwtq.svg"
          alt="mouse"
        />    </Flex>
    </Flex>

  )

}

export default Home
