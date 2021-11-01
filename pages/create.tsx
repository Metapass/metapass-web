import { Box, Flex, Heading, Input, InputGroup, InputRightAddon, Button, Textarea, Checkbox, Text, CheckboxGroup } from '@chakra-ui/react';
import { useState } from 'react';


const Create = () => {

    const [title, setTitle]: any = useState(null);
    const [description, setDescription]: any = useState(null);
    const [isPaid, setIsPaid] = useState(true);
    const [fee, setFee]: any = useState(null);

    const uploadToFirebase = (e: any) => {
        e.preventDefault();


    }


    return (
        <Box p={4} >
			<Flex direction="column" alignItems={"center"} justifyContent={"center"} >
				<Heading m={2}>Create an event</Heading>
				<Input m={2} onChange={(e) => setTitle(e.target.value)} placeholder={"Title"} />
				<Textarea m={2} onChange={e => setDescription(e.target.value)} placeholder={"Description"} />
				<CheckboxGroup>
				<Checkbox m={2} defaultIsChecked={true} onChange={e => setIsPaid(!isPaid)}> Paid Ticket</Checkbox>
				</CheckboxGroup>
				{isPaid ? (
					<InputGroup m={2}>
						<Input onChange={e => setFee(e.target.value)} placeholder={"Amount"} />
						<InputRightAddon >MATIC</InputRightAddon>
					</InputGroup>
					) : null }
				<Button m={2} variant="outline" p={4}>Create Event</Button>
			</Flex>
		</Box>
    )
}

export default Create;