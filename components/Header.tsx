import { Flex, Heading, Button, Box,Image
 } from "@chakra-ui/react";
import Link from "next/link";

function Header({ bal, address, handleWalletConnect }: any) {
    let addressDisplay;
    if (address) {
        let addArr = address.split("");
        addressDisplay =
            addArr[0] +
            addArr[1] +
            addArr[2] +
            addArr[3] +
            "..." +
            addArr[addArr.length - 4] +
            addArr[addArr.length - 3] +
            addArr[addArr.length - 2] +
            addArr[addArr.length - 1];
    }

    return (
        <Flex rounded="md" direction="row" p={2} justifyContent="space-between">
          <Flex ml="2rem" mt="1rem" maxWidth={"md"}>
            <Image position="absolute"  zIndex="overlay"
             src="https://res.cloudinary.com/dev-connect/image/upload/v1636452465/svgs/Group_1Logo_1_1_fbbkez.svg" alt="logo"/>
          </Flex>
          <Flex>
            {bal && address ? (
              <>
                  <Box m={2} p={2}>
                    <Link href="/create">Create event</Link>    
                  </Box>

                  <Box m={2} p={2}>
                  <Link href="/withdraw" >Withdraw funds</Link>    
                  </Box>

                  <Box m={2} p={2}>
                  <Link href="#">How it works?</Link>    
                  </Box>
                <Button  variant="outline" p={4} rounded={"md"} m={2}>
                  {" "}
                  {parseFloat(bal).toFixed(4)}
                </Button>
                <Button variant="outline" p={4} m={2} rounded={"md"}>
                  {" "}
                  {addressDisplay}
                </Button>
              </>
            ) : (
            <Button m={3} p={4} color="white" variant="outline" colorScheme="facebook" onClick={handleWalletConnect}  >Connect Wallet</Button>
            )}
          </Flex>
    </Flex>
    );
}

export default Header;