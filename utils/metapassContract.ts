import {ethers} from 'ethers';
import {abi} from './Metapass.json'

declare const window: any;

let metapass;

if(window !== undefined) {

	const contractAddress = '0xD026d2732EFA940080e178ef75557b19df2E47EA';

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const signer = provider.getSigner();

	metapass = new ethers.Contract(
	  contractAddress,
	  abi,
	  signer
);

}

export {metapass}