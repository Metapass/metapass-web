import { useState, useContext, useEffect } from 'react'
import Header from './Header'
import Web3 from 'web3'
import { walletContext } from '../utils/walletContext'
import { toast } from 'react-toastify'
import WalletConnectProvider from '@walletconnect/web3-provider'
import useMobileDetect from '../utils/useMobileDetect'

const Layout = ({ children }: any) => {
    // State Variables
    const [address, setAddress] = useState(null)
    const [balance, setBalance] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [wallet, setWallet] = useContext(walletContext)

    let windowType: any
    const currentDevice = useMobileDetect()
    let endpoint: any = process.env.NEXT_PUBLIC_ENDPOINT
    const provider = new WalletConnectProvider({
        rpc: {
            1: endpoint,
        },
    })
    let web3 = new Web3(currentDevice.isDesktop() ? endpoint : provider)

    async function loadAccounts() {
        windowType = window

        if (!currentDevice.isDesktop()) {
            let accounts = await windowType.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (windowType.ethereum.networkVersion == '80001') {
                setAddress(accounts[0])
                let bal = await web3.eth.getBalance(accounts[0])
                let ethBal: any = await web3.utils.fromWei(bal, 'ether')
                setBalance(ethBal)

                setWallet({
                    balance: ethBal,
                    address: accounts[0],
                })
            } else {
                toast('Switch to Matic Mumbai Testnet and try again')
            }
        } else {
            //  Enable session (triggers QR Code modal)
            try {
                await provider.enable()
            } catch (e) {
                console.log(e)
            }
            // if (chainId === 80001) {
            //     await provider.enable()
            //     provider.on('accountsChanged', async (accounts: string[]) => {
            //         setAddress(accounts[0])
            //         let bal = web3.eth.getBalance(accounts[0])
            //         let ethBal: any = await web3.utils.fromWei(
            //             bal as any,
            //             'ether'
            //         )
            //         setBalance(ethBal)
            //         setWallet({
            //             balance: ethBal,
            //             address: accounts[0],
            //         })
            //     })
            // } else {
            //     toast('Switch to Matic Mumbai Testnet and try again')
            // }
        }
    }

    useEffect(() => {
        provider.on('chainChanged', async (chainId: number) => {
            setChainId(chainId)
        })

        async function checkChainId() {
            if (chainId === 80001) {
                await provider.enable()
                provider.on('accountsChanged', async (accounts: string[]) => {
                    setAddress(accounts[0])
                    let bal = web3.eth.getBalance(accounts[0])
                    let ethBal: any = await web3.utils.fromWei(
                        bal as any,
                        'ether'
                    )
                    setBalance(ethBal)
                    setWallet({
                        balance: ethBal,
                        address: accounts[0],
                    })
                })
            } else {
                toast('Switch to Matic Mumbai Testnet and try again')
            }
        }
        checkChainId()
    }, [provider, web3]) // eslint-disable-line

    return (
        <div>
            <Header
                bal={balance}
                address={address}
                handleWalletConnect={loadAccounts}
            />
            {children}
        </div>
    )
}

export default Layout
