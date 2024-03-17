import { Container, Flex, Img } from "@chakra-ui/react";

export default function Topbar({ config }) {
    console.log(config.logo)
    return (
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
                    <Img w={16} h="auto" src={config && config?.logo ? `${config.logo}` : '/images/logo.png'} />
                </Flex>
            </Container>
        </Flex>
    )
}