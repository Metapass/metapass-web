import type { NextPage } from 'next'
import Head from 'next/head'
import HeroText from '../components/herotext'
import { Text, Box, Flex, Button, Image } from "@chakra-ui/react"
import HeroTicket from '../components/heroticket'


const Home: NextPage = () => {

  return (
    <Flex
      justify="space-between"
    >
      <Head>
        <title>MetaPass</title>
      </Head>

      <HeroText />


      <HeroTicket />


    </Flex>

  )

}

export default Home