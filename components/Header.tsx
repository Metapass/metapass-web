import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'

export default function WithSubnavigation({
    bal,
    address,
    handleWalletConnect,
}: any) {
    const { isOpen, onToggle } = useDisclosure()
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
    return (
        <Box>
            <Flex
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Link href="/">
                        <Image
                            height={{ base: '5rem', md: '3rem' }}
                            zIndex="overlay"
                            src="https://res.cloudinary.com/dev-connect/image/upload/v1636452465/svgs/Group_1Logo_1_1_fbbkez.svg"
                            alt="Logo"
                        />
                    </Link>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    alignItems="center"
                >
                    {bal && address ? (
                        <>
                            <Button
                                variant="outline"
                                p={4}
                                rounded={'md'}
                                m={2}
                            >
                                {parseFloat(bal).toFixed(4)}{' '}
                            </Button>{' '}
                            <Button
                                variant="outline"
                                p={4}
                                m={2}
                                rounded={'md'}
                            >
                                {addressDisplay}{' '}
                            </Button>
                        </>
                    ) : (
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'md'}
                            fontWeight={600}
                            color={'white'}
                            onClick={handleWalletConnect}
                            variant="outline"
                        >
                            Connect Wallet
                        </Button>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav
                    addressDisplay={addressDisplay}
                    bal={bal}
                    handleWalletConnect={handleWalletConnect}
                />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4} alignItems="center">
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{
                        opacity: '100%',
                        transform: 'translateX(0)',
                    }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon
                        color={'pink.400'}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </Link>
    )
}

const MobileNav = ({ addressDisplay, handleWalletConnect }: any) => {
    return (
        <Stack p={4} display={{ md: 'none' }}>
            {addressDisplay ? (
                <>
                    <Button variant="outline" p={4} m={2} rounded={'md'}>
                        Wallet is Connected
                    </Button>
                </>
            ) : (
                <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'md'}
                    fontWeight={600}
                    color={'white'}
                    onClick={handleWalletConnect}
                    variant="outline"
                >
                    Connect Wallet
                </Button>
            )}

            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: '0!important' }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Create',
        href: '/create',
    },
    {
        label: 'My Events',
        href: '/myevents',
    },
    {
        label: 'Explore',
        href: '/explore',
    },
    {
        label: 'Withdraw Funds',
        href: '/withdraw',
    },
]
