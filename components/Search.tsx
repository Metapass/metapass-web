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
                variant="outline"
                placeholder="Search..."
                autoFocus
                maxW={['100%', '100%', '100%', '600px']}
                minW={['100%', '100%', '100%', '600px']}
            />
            <AutoCompleteList
                minW={['100%', '100%', '100%', '600px']}
                maxW={['100%', '100%', '100%', '600px']}
            >
                {options.map((option, oid) => (
                    <AutoCompleteItem
                        maxW={['100%', '100%', '100%', '600px']}
                        minW={['100%', '100%', '100%', '600px']}
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
