import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import Header from './Header'
import Web3 from 'web3'

const Layout = ({ children }: any) => {

    // State Variables
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);

    let windowType: any;

    let endpoint: any = 'https://polygon-mumbai.g.alchemy.com/v2/OakS6vDx0Vps1b2No88N3mDKXF0a2E35'

    let web3 = new Web3(endpoint);

    async function loadAccounts() {
        windowType = window;
        let accounts = await windowType.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        let bal = await web3.eth.getBalance(accounts[0]);
        let ethBal: any = await web3.utils.fromWei(bal, "ether");
        setBalance(ethBal);
    }

    function handleDisconnectClick() {
        windowType = window;
        setAddress(null);
        setBalance(null);
    }

    return (
        <div>
		<Header bal={balance} address={address} load={loadAccounts} handleDisconnectClick={handleDisconnectClick} ></Header>
		{children}
		</div>
    )
}

export default Layout