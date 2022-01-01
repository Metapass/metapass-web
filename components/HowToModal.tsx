import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

function HowToModal({ isOpen, onClose, ...rest }) {
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" {...rest}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>How it works?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <iframe
                            width="420"
                            height="315"
                            src="https://www.youtube.com/embed/gX2a3oUvQMs?autoplay=0&mute=1"
                        ></iframe>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default HowToModal
