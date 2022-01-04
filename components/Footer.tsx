import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode
    label: string
    href: string
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.300')}
            p={2}
            rounded={'full'}
            w="40px"
            h={['100%', '100%', '100%', '100%', '100%']}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
                transform: 'translateY(-10px)',
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

export default function Footer() {
    return (
        <Box
            // bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                h={['100%', '100%', '100%', '100%', '100%']}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text
                    letterSpacing="2%"
                    lineHeight="28.15px"
                    fontWeight={'bold'}
                    fontFamily={'Azonix'}
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
                    Metapass HQ
                </Text>
                {/* <Text></Text> */}
                {/* <Stack direction={'row'}>
                    
                </Stack> */}
                <Stack direction={'row'} spacing={4} align={'center'}>
                    <Text
                        letterSpacing="2%"
                        lineHeight="28.15px"
                        style={{ fontFamily: "'PT Sans', sans-serif" }}
                        fontWeight={'bold'}
                    >
                        Join our Community
                    </Text>
                    <SocialButton
                        label={'Twitter'}
                        href={'https://twitter.com/metapassHQ'}
                    >
                        <FaTwitter size={'1.5rem'} />
                    </SocialButton>
                    {/* <SocialButton label={'YouTube'} href={'#'}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'#'}>
                        <FaInstagram />
                    </SocialButton> */}
                </Stack>
            </Container>
        </Box>
    )
}
