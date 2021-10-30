import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { DarkGlowingButton, GlowingButton } from './GlowingButton';

function Header({ bal, address, load, handleDisconnectClick }: any) {
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
                <Box
                  backgroundColor={"whiteAlpha.700"}
                  p={2}
                  marginRight={1}
                  rounded={"md"}
                  m={2}
                >
                  {" "}
                  {parseFloat(bal).toFixed(4)}
                </Box>
                <Box backgroundColor={"whiteAlpha.700"} p={2} m={2} rounded={"md"}>
                  {" "}
                  {addressDisplay}
                </Box>
                 <DarkGlowingButton m={2} p={1} label={"Disconnect"} onClick={handleDisconnectClick} />
              </>
            ) : (
            <GlowingButton label={"Connect Wallet"} m={2} p={1} onClick={load} />
            )}
          </Flex>
    </Flex>
    );
}

export default Header;