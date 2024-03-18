import { useState, useEffect } from "react";

import {
    chakra,
    Flex,
    Text,
    useToast,
    Spinner,
    Grid,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react"
import { getCookie } from "cookies-next"
import moment from 'moment'
import 'moment/locale/pt-br'
import { parsePhoneNumber } from 'awesome-phonenumber'

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import Head from "../../../components/Head"
import Main from "../../../components/Main"

import config from "../../../config";
import PanelTopbar from "../../../components/PanelTopbar";

export default function Users({ config }) {
    const toast = useToast();
    const token = getCookie("token")

    const { isOpen: isOpenDeleteAlert, onOpen: onOpenDeleteAlert, onClose: onCloseDeleteAlert } = useDisclosure()

    const [users, setUsers] = useState({ isLoading: true, data: [] })
    const [deleteUserID, setDeleteUserID] = useState('')

    const getUsers = async () => {
        try {
            const users = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/list`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const json = await users.json()

            if (json.ok) {
                setUsers({ isLoading: false, data: json.data })
            } else {
                return toast({
                    status: "error",
                    title: json.message
                })
            }

        } catch (error) {
            console.log(error)
            setUsers({ isLoading: false, data: [] })
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/delete?id=${deleteUserID}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const json = await response.json()

            if (json.ok) {
                toast({
                    status: "success",
                    title: json.data
                })
            } else {
                toast({
                    status: "error",
                    title: json.message
                })
            }

            onCloseDeleteAlert()
            getUsers()

        } catch (error) {
            return toast({
                status: "error",
                title: error.message
            })
        }


    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Assinantes newsletter" config={config} />
            <Flex w="100%" h="100%" justifyContent="center" alignItems="center" flexDir="column" p={4}>
                <PanelTopbar config={config} />
                <Flex
                    w="100%"
                    h="100%"
                    alignItems="flex-start"
                    flexDir="column"
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    p={4}
                    mt={4}
                    minH={40}
                    overflowY="scroll"
                >
                    <Flex w="100%" className="add-product" justifyContent="space-between" alignItems="center">
                        <Text>Usuários cadastrados: <chakra.span fontWeight="bold">{users.data.length}</chakra.span></Text>
                    </Flex>
                    {users.isLoading
                        ?
                        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center" mt={4} flexDir="column">
                            <Spinner size="lg" />
                            <Text fontSize="20px" mt={2}>Carregando...</Text>
                        </Flex>
                        : users.data.length == 0

                            ?
                            <Flex w="100%" h="100vh" justifyContent="center" alignItems="center" mt={4} flexDir="column">
                                <Text fontSize="20px">Nenhum assinante ainda!</Text>
                            </Flex>
                            :
                            <Flex w="100%" mt={4} flexDir="column" overflow="scroll">
                                <TableContainer>
                                    <Table variant='simple'>
                                        <Thead>
                                            <Tr>
                                                <Th>Número</Th>
                                                <Th>Assinado em</Th>
                                                <Th>Ações</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {users.data.map((user, index) => {
                                                return (
                                                    <Tr key={user.id}>
                                                        <Td>{parsePhoneNumber(`${user.whatsapp}`, { regionCode: 'BR' }).number.international}</Td>
                                                        <Td>{moment(user.created_at).format("LLL")}</Td>
                                                        <Td>
                                                            <Button leftIcon={<AiOutlineDelete />} className="delete-button" colorScheme='red' onClick={() => {
                                                                setDeleteUserID(user.id)
                                                                onOpenDeleteAlert()
                                                            }}>
                                                                Excluir
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Flex>
                    }
                </Flex>
            </Flex>
            <AlertDialog
                isOpen={isOpenDeleteAlert}
                onClose={onCloseDeleteAlert}
                isCentered
            >
                <AlertDialogOverlay backdropFilter="blur(10px)">
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Deletar assinate
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza? Você não pode desfazer esta ação posteriormente.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onCloseDeleteAlert}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' className="delete-button" onClick={() => handleDeleteUser(deleteUserID)} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Main>
    )
}

export async function getServerSideProps({ req, res }) {
    const token = getCookie("token", { req, res })

    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login"
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify_token`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.ok) {
            const getConfig = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/configuration/get`)
            const configJson = await getConfig.json()
            return {
                props: {
                    config: configJson.data
                }
            }
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/login"
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login"
            }
        }
    }

}