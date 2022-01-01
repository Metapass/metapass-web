import {
    Flex,
    useColorModeValue,
    Box,
    chakra,
    Icon,
    Image,
    Avatar,
} from '@chakra-ui/react'

import { MdHeadset, MdLocationOn, MdEmail } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'

export default function TicketCard({ ticket }) {
    return (
        <Box
            m={4}
            w="xs"
            mx="auto"
            bg={useColorModeValue('white', 'gray.800')}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
        >
            <Image
                w="full"
                h={56}
                fit="cover"
                objectPosition="center"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
            />

            <Avatar
                pos="absolute"
                top={330}
                name="John Doe"
                size="lg"
                mx={2}
                src="https://bit.ly/dan-abramov"
            />

            <Box py={4} px={6}>
                <chakra.h1
                    fontSize="xl"
                    fontWeight="bold"
                    color={useColorModeValue('gray.800', 'white')}
                >
                    Patterson johnson
                </chakra.h1>

                <chakra.p
                    py={2}
                    color={useColorModeValue('gray.700', 'gray.400')}
                >
                    Full Stack maker & UI / UX Designer , love hip hop music
                    Author of Building UI.
                </chakra.p>

                <Flex
                    alignItems="center"
                    mt={4}
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

                    <chakra.h1 px={2} fontSize="sm">
                        Choc UI
                    </chakra.h1>
                </Flex>

                <Flex
                    alignItems="center"
                    mt={4}
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                    <chakra.h1 px={2} fontSize="sm">
                        California
                    </chakra.h1>
                </Flex>
                <Flex
                    alignItems="center"
                    mt={4}
                    color={useColorModeValue('gray.700', 'gray.200')}
                >
                    <Icon as={MdEmail} h={6} w={6} mr={2} />

                    <chakra.h1 px={2} fontSize="sm">
                        patterson@example.com
                    </chakra.h1>
                </Flex>
            </Box>
        </Box>
    )
}
