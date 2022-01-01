import { Flex, useColorModeValue } from '@chakra-ui/react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
export default function Component() {
    const options = ['apple', 'appoint', 'zap', 'cap', 'japan']

    return (
        <AutoComplete rollNavigation>
            <AutoCompleteInput
                variant="filled"
                placeholder="Search..."
                autoFocus
                maxW="200px"
            />
            <AutoCompleteList maxW="200px">
                {options.map((option, oid) => (
                    <AutoCompleteItem
                        maxW="200px"
                        key={`option-${oid}`}
                        value={option}
                        textTransform="capitalize"
                    >
                        {option}
                    </AutoCompleteItem>
                ))}
            </AutoCompleteList>
        </AutoComplete>
    )
}
