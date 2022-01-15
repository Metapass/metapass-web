import { useState, useContext } from 'react'
import Header from './Header'
import Web3 from 'web3'
import { walletContext } from '../utils/walletContext'
import { Box } from '@chakra-ui/react'
import splitbee from '@splitbee/web'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

const Layout = ({ children }: any) => {
    // State Variables
    const [address, setAddress] = useState(null)
    const [balance, setBalance] = useState(null)

    const [wallet, setWallet, provider, setProvider] = useContext(walletContext)

    let windowType: any

    let endpoint: any = process.env.NEXT_PUBLIC_ENDPOINT
    let web3 = new Web3(endpoint)
    const polygon = {
        chainId: 137,
        chainIdHex: '0x89',
        name: 'Polygon (Matic)',
        shortName: 'Polygon',
        img: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
        enabled: true,
        addData: {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com/'],
        },
    }

    useEffect(() => {
        splitbee.init()
    })

    const { authenticate } = useMoralis()

    async function loadAccounts() {
        windowType = window

        if (windowType.ethereum) {
            let accounts = await windowType.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (
                windowType.ethereum.chainId == process.env.NEXT_PUBLIC_CHAIN_ID
            ) {
                setAddress(accounts[0])
                let bal = await web3.eth.getBalance(accounts[0])
                let ethBal: any = await web3.utils.fromWei(bal, 'ether')
                setBalance(ethBal)

                setWallet({
                    balance: ethBal,
                    address: accounts[0],
                })
            } else {
                try {
                    await windowType.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID }],
                    })
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        try {
                            await windowType.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [polygon.addData],
                            })
                        } catch (addError) {
                            console.log('Error Adding chain: ', addError)
                        }
                    }
                    console.log('Error Switching Chains: ', switchError)
                }
            }
        } else {
            const user = await authenticate({
                provider: 'walletconnect',
                chainId: 137,
            })
        }
    }

    return (
        <Box minWidth={'max-content'}>
            <Header
                bal={balance}
                address={address}
                handleWalletConnect={loadAccounts}
            />
            {children}
        </Box>
    )
}

export default Layout
