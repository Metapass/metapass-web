import { Box, Flex, Text, Code, useClipboard } from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react'
import { addDoc, collection, db } from '../utils/firebase'
import { walletContext } from '../utils/walletContext'
import Head from 'next/head'
import CreateForm from '../components/CreateForm'
import { toast } from 'react-toastify'
import { create, urlSource } from 'ipfs-http-client'

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
})

const Create = () => {
    const [wallet] = useContext(walletContext)

    const [title, setTitle]: any = useState(null)
    const [description, setDescription]: any = useState(null)
    const [isPaid, setIsPaid] = useState(true)
    const [fee, setFee]: any = useState(0)
    const [seats, setSeats]: any = useState(0)
    const [file, setFile]: any = useState(undefined)
    const [cid, setCid]: any = useState('')

    const [created, setCreated] = useState(false)

    const [docId, setDocId]: any = useState(null)

    const { hasCopied, onCopy } = useClipboard(
        `https://metapass.vercel.app/event/${docId}`
    )

    useEffect(() => {
        if (file !== undefined) {
            let reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = async (e) => {
                let res: ArrayBuffer = reader.result as ArrayBuffer
                let b = new Buffer(res)
                const { cid } = await ipfs.add(b)
                console.log(cid.toString())
                setCid(cid.toString())
            }
        } else {
            console.log('file is undefined')
        }
    }, [file])

    if (hasCopied) {
        toast('copied the link!')
    }

    const uploadToFirebase = async (e: any) => {
        if (!wallet.address) {
            console.log('login pls')
        } else if (title && description && file) {
            try {
                let docRef = await addDoc(collection(db, 'events'), {
                    title: title,
                    description: description,
                    isPaid: isPaid,
                    fee: fee,
                    eventOwner: wallet.address,
                    seats: seats,
                    occupiedSeats: 0,
                    image: `https://ipfs.io/ipfs/${cid}`,
                })
                setDocId(docRef.id)
                setCreated(true)
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
                                {`https://metapass.vercel.app/event/${docId}`}
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
                    >
                        {' '}
                    </CreateForm>
                )}
            </Flex>
        </Box>
    )
}

export default Create
