import {Box, Flex, Button, Heading, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {doc, getDoc, db, updateDoc} from '../../utils/firebase';
import {useEffect, useState, useContext} from 'react';
import {walletContext} from '../../utils/walletContext';

import { ethers } from 'ethers';
import abi from '../../utils/Metapass.json';

import { toast } from 'react-toastify';


function ID() {

    const [wallet] = useContext(walletContext);
    
    const [event, setEvent] = useState(null);

    const router = useRouter();

    const { id } = router.query;

    useEffect( async() => {

        if(id) {
            let docRef = doc(db, "events", id);
            let docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setEvent(docSnap.data());
            } else {
                console.log("doc data don't exist");
            }
        } else {
                console.log('id not yet initialized')
        }
        
    }, [id]);

        const mintTicket = async () => {
        
            const contractAddress = '0xD026d2732EFA940080e178ef75557b19df2E47EA';
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            
            if(wallet.address) {

            const metapass = new ethers.Contract(
                contractAddress,
                abi.abi,
                signer
            );

            let metadata = {
                "name": event.title,
                "description": `NFT Ticket for ${event.title}`,
                "image": "https://i.imgur.com/QCns31F.jpeg",
                "properties": {
                    "Ticket Number": parseInt(event.occupiedSeats) + 1 
                }
            }

            let txn = await metapass.getTix(event.eventOwner, JSON.stringify(metadata) , { value: ethers.utils.parseEther('0.01') })

            await txn.wait();
            
            console.log("Txn completed!")

            let docRef = doc(db, "events", id);
            updateDoc(docRef, {
                "occupiedSeats": event.occupiedSeats + 1
            }).then(r => console.log('updated backend'))

            toast.success("NFT Sent to your wallet! ✨");

            } else {
                console.log("connect wallet pls bro")
            }
            
        }

    return (
        <Box p={4}>
            <Flex direction="column" justifyContent={"center"} alignItems={"center"} >
            {
                event ? (
                    <>
                    <Heading m={2}>{event.title}</Heading>
                    <Text m={1}>total seats: {event.seats}</Text>
                    <Text m={1}>total remaining: {parseInt(event.seats) - parseInt(event.occupiedSeats)}</Text>
                    <Text m={2}>{event.description}</Text>
                    <Button p={4} m={2} variant="outline" onClick={mintTicket}>get ticket</Button>
                    </>
                ) : (<>Loading ...</>)
            }
            </Flex>
        </Box>
    )
}

export default ID
