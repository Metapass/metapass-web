import { Box, Flex,Text} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { addDoc, collection, db } from '../utils/firebase';
import {walletContext} from '../utils/walletContext';
import Head from 'next/head';
import CreateForm from '../components/CreateForm';

const Create = () => {

	const [ wallet, setWallet] = useContext(walletContext);

    const [title, setTitle]: any = useState(null);
    const [description, setDescription]: any = useState(null);
    const [isPaid, setIsPaid] = useState(true);
    const [fee, setFee]: any = useState(0);
    const [seats, setSeats]: any = useState(0);

	const [created, setCreated] = useState(false);

	const [docId, setDocId]: any = useState(null);

    const uploadToFirebase = async (e: any) => {
        e.preventDefault();
		if(!wallet.address) {
			console.log('login pls')
		} else {
			try{			
				let docRef = await addDoc(collection(db, "events"), {
					title: title,
					description: description,
					isPaid: isPaid,
					fee: fee,
					eventOwner: wallet.address,
					seats: seats,
					occupiedSeats: 0
				})
				setDocId(docRef.id);
				setCreated(true);
			} catch (e) {
				console.log(e)
			}
		}
	}


    return (
        <Box p={4} >
			<Head><title>create an event // metapass</title></Head>
			<Flex direction="column" alignItems={"center"} justifyContent={"center"} >
				{
					created ? (<>
					<Text>
						you've successfully created an event! Share this link for booking
						{' '}
						{`https://[domain].com/event/${docId}`}
					</Text>
					</>) :  (<CreateForm setTitle={setTitle} setDescription={setDescription} isPaid={isPaid} setFee={setFee} uploadToFirebase={uploadToFirebase} setIsPaid={setIsPaid} setSeats={setSeats} />)
				}
			</Flex>
		</Box>
    )
}

export default Create;