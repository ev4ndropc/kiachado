import { useRef } from "react";
import { useRouter } from "next/router";
import {
    Flex,
    HStack,
    Img,
    ListItem,
    UnorderedList,
    Text,
    Icon,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Center
} from "@chakra-ui/react";
import { deleteCookie } from 'cookies-next'

import { IoIosHome, IoMdLogOut, IoMdSettings } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";




export default function PanelTopbar({ config }) {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const colors = { bg: 'orange.300', color: 'white', borderRadius: 'md' };

    const handleLogout = () => {
        deleteCookie('token')
        router.push('/admin/login')
    }

    return (
        <>
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
                <Flex className="topbar-menu">
                    <Icon onClick={onOpen} fontSize="28px" as={IoMdMenu} cursor="pointer" />
                </Flex>
                <Flex className="desktop-only" flex={1} alignItems="center" justifyContent="space-between">
                    <Flex>
                        <Img w={16} src={config && config?.logo ? `${config.logo}` : '/images/logo.png'} alt='Logo' />
                    </Flex>
                    <UnorderedList display="flex" flexDir="row" alignItems="center" listStyleType="none" p={0} m={0}>
                        <ListItem
                            cursor="pointer"
                            p={2}
                            mr={4}
                            {...(router.pathname === '/admin/produtos' ? colors : {})}
                            className={router.pathname === '/admin/produtos' ? 'active' : ''}
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
                            className={router.pathname === '/admin/usuarios' ? 'active' : ''}
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
                            className={router.pathname === '/admin/configuracoes' ? 'active' : ''}
                            onClick={() => router.push('/admin/configuracoes')}
                        >
                            <HStack>
                                <Icon as={IoMdSettings} />
                                <Text>Configurações</Text>
                            </HStack>
                        </ListItem>
                        <ListItem
                            cursor="pointer"
                            p={2}
                            onClick={handleLogout}
                        >
                            <HStack>
                                <Icon as={IoMdLogOut} />
                                <Text>Sair</Text>
                            </HStack>
                        </ListItem>
                    </UnorderedList>
                </Flex >
            </Flex >
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay
                    bg='blackAlpha.500'
                    backdropFilter='blur(10px)'
                />
                <DrawerContent className="mobile-menu">
                    <DrawerHeader>
                        <Img w="150px" src='/images/logo.png' alt='Logo' />
                    </DrawerHeader>

                    <DrawerBody>
                        <UnorderedList display="flex" flexDir="column" alignItems="flex-start" listStyleType="none" p={0} m={0}>
                            <ListItem
                                w="100%"
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
                                w="100%"
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
                                w="100%"
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
                            <ListItem
                                cursor="pointer"
                                p={2}
                                onClick={handleLogout}
                            >
                                <HStack>
                                    <Icon as={IoMdLogOut} />
                                    <Text>Sair</Text>
                                </HStack>
                            </ListItem>
                        </UnorderedList>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}