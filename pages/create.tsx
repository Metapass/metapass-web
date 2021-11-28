import { Box, Flex, Text, Code, useClipboard } from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react'
import { addDoc, collection, db } from '../utils/firebase'
import { walletContext } from '../utils/walletContext'
import Head from 'next/head'
import CreateForm from '../components/CreateForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ticketToIPFS } from '../utils/ticketToIPFS'

const Create = () => {
    const [wallet] = useContext(walletContext)

    const [title, setTitle]: any = useState(null)
    const [description, setDescription]: any = useState(null)
    const [isPaid, setIsPaid] = useState(true)
    const [fee, setFee]: any = useState(0)
    const [seats, setSeats]: any = useState(0)
    const [file, setFile]: any = useState(undefined)
    const [date, setDate]: any = useState(undefined)
    const [manual, setManual]: any = useState(null)

    const [created, setCreated] = useState(false)

    const [docId, setDocId]: any = useState(null)
    const [txn, setInTxn] = useState(false)
    const { hasCopied, onCopy } = useClipboard(
        `https://metapass-web-production.up.railway.app/event/${docId}`
    )

    if (hasCopied) {
        toast('copied the link!')
    }

    const uploadToCloudinary = async () => {
        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'public')

        let post = await axios.post(
            'https://api.cloudinary.com/v1_1/metapass/image/upload',
            formData
        )
        return post.data.secure_url
    }

    const uploadToFirebase = async (e: any) => {
        if (!wallet.address) {
            console.log('login pls')
            toast('Connect Wallet')
        } else if (title && description && file) {
            setInTxn(true)
            try {
                let imageUrl = await uploadToCloudinary()

                let docRef = await addDoc(collection(db, 'events'), {
                    title: title,
                    description: description,
                    isPaid: isPaid,
                    fee: fee,
                    eventOwner: wallet.address,
                    seats: seats,
                    occupiedSeats: 0,
                    image: imageUrl,
                    date: date.toString(),
                    manual: manual,
                })
                setDocId(docRef.id)
                setCreated(true)
                setInTxn(false)
            } catch (e) {
                console.log(e)
            }
        } else {
            toast('Make sure all fields are filled')
        }
    }

    return (
        <Box p={4}>
            <Head>
                <title>create an event // metapass</title>
            </Head>
            <Flex
                direction="column"
                alignItems={'center'}
                justifyContent={'center'}
            >
                {created ? (
                    <>
                        <Text>
                            you've successfully created an event! Share this
                            link for booking{' '}
                            <Code onClick={onCopy}>
                                {`https://testnet.metapass.ml/event/${docId}`}
                            </Code>
                        </Text>
                    </>
                ) : (
                    <CreateForm
                        setFile={setFile}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        isPaid={isPaid}
                        setFee={setFee}
                        uploadToFirebase={uploadToFirebase}
                        setIsPaid={setIsPaid}
                        setSeats={setSeats}
                        setDate={setDate}
                        setManual={setManual}
                        inTxn={txn}
                    >
                        {' '}
                    </CreateForm>
                )}
            </Flex>
        </Box>
    )
}

export default Create
