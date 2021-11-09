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
      </Head>

      <Image src="https://res.cloudinary.com/dev-connect/image/upload/v1636454924/svgs/stra_p8dqyd.svg"
        alt="star"
        flex="3"
        position="absolute"
        alignSelf="center"
        marginTop="-20.5rem"
        marginLeft="1.5rem"
      />

      <HeroText  />


      <HeroTicket />


    </Flex>
    <Flex
    justifyContent="center"
    >
      <Image 
      p={5}
      position="absolute"
      bottom="-35"
      w="25%"
      height="20%"
      src="https://res.cloudinary.com/dev-connect/image/upload/v1636466159/svgs/mouse_nlkwtq.svg"
      alt="mouse"
      />    </Flex>
    </Flex>

  )

}

export default Home