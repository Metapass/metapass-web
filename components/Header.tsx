import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { DarkGlowingButton, GlowingButton } from './GlowingButton';

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
          <Flex maxWidth={"md"}>
            <Heading fontSize={"xl"} p={2}>
              <Link href="/">MetaPass</Link>
            </Heading>
          </Flex>
          <Flex>
            {bal && address ? (
              <>
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
            <Button p={4} color="white" variant="outline" colorScheme="facebook" onClick={handleWalletConnect}  >Connect Wallet</Button>
            )}
          </Flex>
    </Flex>
    );
}

export default Header;