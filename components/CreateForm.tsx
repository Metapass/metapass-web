import {
    Heading,
    Input,
    Textarea,
    Checkbox,
    CheckboxGroup,
    InputGroup,
    InputRightAddon,
    Button,
} from '@chakra-ui/react'
import crypto from 'crypto-js'

import Link from 'next/link'

function CreateForm({
    setTitle,
    setDescription,
    isPaid,
    setFee,
    uploadToFirebase,
    setIsPaid,
    setSeats,
    setFile,
    setDate,
    setManual,
    inTxn,
}: any) {
    const encryptLink = (link) => {
        let enc = crypto.AES.encrypt(
            link,
            process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString()
        setManual(enc)
    }
    return (
        <>
            <Heading m={2}>Create an event</Heading>
            <Input
                m={2}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Title'}
            />
            <Textarea
                m={2}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={'Description'}
            />
            <Input
                onChange={(e) => setSeats(e.target.value)}
                placeholder={'Seats'}
            />
            <InputGroup m={2}>
                <Input
                    type="file"
                    p={1}
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputRightAddon>
                    {' '}
                    <Link href="#">
                        Ticket image for your event to be minted as NFT. Click
                        here for sample.
                    </Link>{' '}
                </InputRightAddon>
            </InputGroup>
            <CheckboxGroup>
                <Checkbox
                    m={2}
                    defaultIsChecked={true}
                    onChange={(e) => setIsPaid(!isPaid)}
                >
                    {' '}
                    Paid Ticket
                </Checkbox>{' '}
            </CheckboxGroup>{' '}
            {isPaid ? (
                <InputGroup m={2}>
                    <Input
                        onChange={(e) => setFee(e.target.value)}
                        placeholder={'Amount'}
                    />
                    <InputRightAddon>MATIC</InputRightAddon>
                </InputGroup>
            ) : null}
            <Input
                type="date"
                onChange={({ target }) => {
                    setDate(new Date(target.value))
                }}
            />
            <hr color="red" />
            <Input
                m={2}
                onChange={(e) => encryptLink(e.target.value)}
                placeholder="link to join events for attendees"
            />
            <Button
                m={2}
                variant="outline"
                p={4}
                isLoading={inTxn}
                disabled={inTxn}
                onClick={uploadToFirebase}
            >
                Create Event
            </Button>
        </>
    )
}

export default CreateForm
