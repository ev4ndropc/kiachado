import { useRouter } from "next/router";
import { Flex, HStack, Img, ListItem, UnorderedList, Text, Icon } from "@chakra-ui/react";
import { IoIosHome, IoMdSettings } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";



export default function PanelTopbar() {
    const router = useRouter()
    const colors = { bg: 'orange.300', color: 'white', borderRadius: 'md' };

    return (
        <Flex
            w="100%"
            h="80px"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            flexDir="row"
            alignItems="center"
            p={4}
            className="panel-topbar"
        >
            <Flex className="topbar-logo">
                <Icon fontSize="28px" as={IoMdMenu} cursor="pointer" />
            </Flex>
            <Flex className="desktop-only" flex={1} alignItems="center" justifyContent="flex-end" boxShadow="md">
                <UnorderedList display="flex" flexDir="row" alignItems="center" listStyleType="none" p={0} m={0}>
                    <ListItem
                        cursor="pointer"
                        p={2}
                        mr={4}
                        {...(router.pathname === '/admin/produtos' ? colors : {})}
                        onClick={() => router.push('/admin/produtos')}
                    >
                        <HStack>
                            <Icon as={IoIosHome} />
                            <Text>Produtos</Text>
                        </HStack>
                    </ListItem>
                    <ListItem
                        cursor="pointer"
                        p={2}
                        mr={4}
                        {...(router.pathname === '/admin/usuarios' ? colors : {})}
                        onClick={() => router.push('/admin/usuarios')}
                    >
                        <HStack>
                            <Icon as={HiMiniUsers} />
                            <Text>Usuários</Text>
                        </HStack>
                    </ListItem>
                    <ListItem
                        cursor="pointer"
                        p={2}
                        {...(router.pathname === '/admin/configuracoes' ? colors : {})}
                        onClick={() => router.push('/admin/configuracoes')}
                    >
                        <HStack>
                            <Icon as={IoMdSettings} />
                            <Text>Configurações</Text>
                        </HStack>
                    </ListItem>
                </UnorderedList>
            </Flex >
        </Flex >
    )
}