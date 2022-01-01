import { Flex, Button, Box, Image, useDisclosure, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import HowToModal from './HowToModal'
const MenuItem = ({ children, isLast, to = '/', ...rest }: any) => {
    return (
        <Text
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            display="block"
            {...rest}
        >
            {to !== 'none' ? <Link href={to}>{children}</Link> : children}
        </Text>
    )
}

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
)

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
)
function Header({ bal, address, handleWalletConnect }: any) {
    let addressDisplay
    if (address) {
        let addArr = address.split('')
        addressDisplay =
            addArr[0] +
            addArr[1] +
            addArr[2] +
            addArr[3] +
            '...' +
            addArr[addArr.length - 4] +
            addArr[addArr.length - 3] +
            addArr[addArr.length - 2] +
            addArr[addArr.length - 1]
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const toggleMenu = () => setShow(!show)
    return (
        <Flex
            rounded="md"
            wrap="wrap"
            direction="row"
            p={2}
            justifyContent="space-between"
        >
            <Link href="/" passHref>
                <Flex ml="2rem" mt="1rem" maxWidth={'md'}>
                    <Image
                        position="absolute"
                        zIndex="overlay"
                        src="https://res.cloudinary.com/dev-connect/image/upload/v1636452465/svgs/Group_1Logo_1_1_fbbkez.svg"
                        alt="logo"
                    />
                </Flex>
            </Link>
            <Box
                mt="2rem"
                mr="2rem"
                display={{ base: 'block', md: 'none' }}
                onClick={toggleMenu}
            >
                {show ? <CloseIcon /> : <MenuIcon />}
            </Box>

            <Box
                display={{ base: show ? 'block' : 'none', md: 'block' }}
                flexBasis={{ base: '100%', md: 'auto' }}
            >
                <Flex
                    mt="1rem"
                    alignItems="center"
                    justify={['center', 'center', 'flex-end', 'flex-end']}
                    direction={['column', 'column', 'row', 'row']}
                    pt={[4, 4, 0, 0]}
                >
                    {bal && address ? (
                        <>
                            <HowToModal
                                isOpen={isOpen as any}
                                onClose={onClose}
                                m={!show ? '0' : '1.5rem'}
                                p={!show ? '0' : '0.5rem'}
                                border={!show ? 'none' : '2px solid white'}
                            />
                            <MenuItem
                                m={!show ? '0' : '1.5rem'}
                                p={!show ? '0' : '0.5rem'}
                                border={!show ? 'none' : '2px solid white'}
                                to="/create"
                                isLast={false}
                            >
                                Create event
                            </MenuItem>
                            <MenuItem
                                m={!show ? '0' : '1.5rem'}
                                p={!show ? '0' : '0.5rem'}
                                border={!show ? 'none' : '2px solid white'}
                                to="/withdraw"
                                isLast={false}
                            >
                                Withdraw
                            </MenuItem>
                            <MenuItem
                                m={!show ? '0' : '1.5rem'}
                                p={!show ? '0' : '0.5rem'}
                                border={!show ? 'none' : '2px solid white'}
                                to="/myevents"
                                isLast={false}
                            >
                                My events
                            </MenuItem>
                            <MenuItem
                                m={!show ? '0' : '1.5rem'}
                                p={!show ? '0' : '0.5rem'}
                                border={!show ? 'none' : '2px solid white'}
                                to="/explore"
                                isLast={false}
                            >
                                Explore
                            </MenuItem>
                            <MenuItem
                                m={!show ? '0' : '1.5rem'}
                                p={!show ? '0' : '0.5rem'}
                                border={!show ? 'none' : '2px solid white'}
                                to="none"
                                isLast={false}
                            >
                                <Text onClick={onOpen}>How it works?</Text>
                            </MenuItem>
                            <MenuItem to="none" isLast={true}>
                                <Button
                                    m={!show ? '0' : '1.5rem'}
                                    p={!show ? '0' : '0.5rem'}
                                    variant="outline"
                                    // p={4}
                                    rounded={'md'}
                                    // m={2}
                                >
                                    {' '}
                                    {parseFloat(bal).toFixed(4)}
                                </Button>
                            </MenuItem>
                            <MenuItem to="none" isLast={true}>
                                <Button
                                    variant="outline"
                                    p={4}
                                    m={2}
                                    rounded={'md'}
                                >
                                    {' '}
                                    {addressDisplay}
                                </Button>
                            </MenuItem>
                            {/* <Box m={2} p={2}>
                            <Link href="/withdraw">Withdraw funds</Link>
                        </Box>

                        <Box m={2} p={2}>
                            <Link href="/myevents">My Events</Link>
                        </Box>
                        <Box m={2} p={2}>
                            <Link href="/explore">Explore</Link>
                        </Box>
                        <Box m={2} p={2}>
                            <Text onClick={onOpen}>How it works?</Text>
                        </Box>
                        <Button variant="outline" p={4} rounded={'md'} m={2}>
                            {' '}
                            {parseFloat(bal).toFixed(4)}
                        </Button>
                        <Button variant="outline" p={4} m={2} rounded={'md'}>
                            {' '}
                            {addressDisplay}
                        </Button> */}
                        </>
                    ) : (
                        <MenuItem to="none" isLast={false}>
                            <Button
                                m={3}
                                p={4}
                                color="white"
                                variant="outline"
                                colorScheme="facebook"
                                onClick={handleWalletConnect}
                            >
                                Connect Wallet
                            </Button>
                        </MenuItem>
                    )}
                </Flex>
            </Box>
        </Flex>
    )
}

export default Header
