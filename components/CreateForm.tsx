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
            <Heading m={2} fontSize={{ md: '3xl', base: '6xl' }}>
                Create an event
            </Heading>
            <Input
                m={2}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Title'}
                variant="flushed"
                size={'6xl'}
            />
            <Textarea
                m={2}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={'Description'}
                variant="flushed"
            />
            <Input
                onChange={(e) => setSeats(e.target.value)}
                placeholder={'Seats'}
                variant="flushed"
            />
            <InputGroup m={2}>
                <Input
                    type="file"
                    p={1}
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    variant="flushed"
                />
                <InputRightAddon>
                    {' '}
                    <Link href="https://res.cloudinary.com/metapass/image/upload/v1638080544/helper_file_yffvrd.png">
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
                        variant="flushed"
                        type="number"
                    />
                    <InputRightAddon>MATIC</InputRightAddon>
                </InputGroup>
            ) : null}
            <Input
                type="date"
                onChange={({ target }) => {
                    setDate(new Date(target.value))
                }}
                variant="flushed"
                placeholder="Date"
            />
            <hr color="red" />
            <Input
                m={2}
                onChange={(e) => encryptLink(e.target.value)}
                placeholder="Link for attendees to join event"
                variant="flushed"
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
