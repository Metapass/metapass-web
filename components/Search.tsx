import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
export default function Search({ tickets, setSearchKey }: any) {
    const titles = tickets.map((ticket: any) => ticket.title)
    // const tickets = ['apple', 'appoint', 'zap', 'cap', 'japan']

    return (
        <AutoComplete rollNavigation>
            <AutoCompleteInput
                variant="outline"
                placeholder="Search..."
                autoFocus
                maxW={['100%', '100%', '100%', '600px']}
                minW={['100%', '100%', '100%', '600px']}
                onChangeCapture={(e: any) => {
                    setSearchKey(e.target.value)
                    console.log(e.target.value)
                }}
            />
            <AutoCompleteList
                minW={['100%', '100%', '100%', '600px']}
                maxW={['100%', '100%', '100%', '600px']}
            >
                {titles &&
                    titles.map((title: any, index: any) => (
                        <AutoCompleteItem
                            maxW={['100%', '100%', '100%', '600px']}
                            minW={['100%', '100%', '100%', '600px']}
                            key={`ticket-${index}`}
                            value={title}
                            textTransform="capitalize"
                        >
                            {title[index]}
                        </AutoCompleteItem>
                    ))}
            </AutoCompleteList>
        </AutoComplete>
    )
}
