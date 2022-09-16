import { Flex } from "@chakra-ui/react";

export default function Main({ children, ...props }) {
    return (
        <Flex 
            w="100%" 
            h="100%" 
            flexDir="column" 
            bg="linear-gradient(62deg, #FBAB7E 0%, #F7CE68 50%, #F7CE68 100%)"
            {...props} 
        >
            {children}
        </Flex>
    )
}