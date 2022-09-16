import { Flex } from "@chakra-ui/react";

export default function Footer () {
    return(
        <Flex
            w="100%" 
            h={40} 
            px={4} 
            alignItems="center" 
            justifyContent="center"
        >
            <Flex 
                w="100%" 
                maxW="1366px"
                alignItems="center" 
                justifyContent="space-between"
            >
                ...
            </Flex>
        </Flex>
    )
}