import { Container, Flex, IconButton, Img, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { BiSearch } from 'react-icons/bi'

export default function Topbar () {
    return(
        <Flex 
            w="100%" 
            h={28} 
            minH={20}
            alignItems="center" 
            justifyContent="center"
        >
            <Container
                w="100%" 
                maxW="1366px"
                alignItems="center" 
                // justifyContent="space-between"
                justifyContent="center"
            >
                <Flex className="logo" justifyContent="center">
                    <Img w={52} h={12} src="/images/logo.png" />
                </Flex>
            </Container>
        </Flex>
    )
}