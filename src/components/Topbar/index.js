import { Flex, IconButton, Img, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { BiSearch } from 'react-icons/bi'

export default function Topbar () {
    return(
        <Flex 
            w="100%" 
            h={28} 
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
                <Flex className="logo">
                    <Img w={40} h={8} src="/images/logo.png" />
                </Flex>

                <Flex>
                    <InputGroup size="md">
                        <Input pr="2.5rem" type="search" placeholder="Pesquisar" bg="white" />
                        <InputRightElement>
                            <BiSearch />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            </Flex>
        </Flex>
    )
}