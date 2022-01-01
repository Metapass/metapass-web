import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
export default function Search({ tickets }: any) {
    // const tickets = ['apple', 'appoint', 'zap', 'cap', 'japan']

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
                {tickets &&
                    tickets.map((ticket: any, index: any) => (
                        <AutoCompleteItem
                            maxW={['100%', '100%', '100%', '600px']}
                            minW={['100%', '100%', '100%', '600px']}
                            key={`ticket-${index}`}
                            value={ticket}
                            textTransform="capitalize"
                        >
                            {ticket[index]}
                        </AutoCompleteItem>
                    ))}
            </AutoCompleteList>
        </AutoComplete>
    )
}
