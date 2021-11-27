import { useState, useContext, useEffect } from 'react'
import Header from './Header'
import Web3 from 'web3'
import { walletContext } from '../utils/walletContext'
import { toast } from 'react-toastify'

const Layout = ({ children }: any) => {
    // State Variables
    const [address, setAddress] = useState(null)
    const [balance, setBalance] = useState(null)

    const [wallet, setWallet] = useContext(walletContext)

    let windowType: any

    let endpoint: any = process.env.NEXT_PUBLIC_ENDPOINT

    async function loadAccounts() {
        windowType = window
        let web3 = new Web3(windowType.web3.currentProvider)

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
                web3: web3,
            })
        } else {
            toast('Switch to Matic Mumbai Testnet and try again')
        }
    }

    function handleDisconnectClick() {
        windowType = window
        setAddress(null)
        setBalance(null)
    }

    useEffect(() => {
        loadAccounts()
    }, [])
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
