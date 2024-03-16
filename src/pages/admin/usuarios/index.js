import { useState, useEffect } from "react";

import {
    chakra,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Img,
    useToast,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    InputGroup,
    InputRightElement,
    IconButton,
    Box,
    Grid,
    Link,
    HStack,
    VStack,
    Divider,
    Center,
    Tooltip,
    AlertDialog,
    AlertDialogBody,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    Icon,
    Heading,
    Badge,
    UnorderedList,
    ListItem
} from "@chakra-ui/react"
import { getCookie } from "cookies-next"
import Rating from 'react-rating';
import moment from 'moment'
import 'moment/locale/pt-br'

import { BsPlusCircle } from "react-icons/bs"
import { BiSearch } from 'react-icons/bi'
import { AiFillStar, AiOutlineLink, AiOutlineDelete, AiOutlineEdit, AiOutlineCopy } from 'react-icons/ai'

import Head from "../../../components/Head"
import Main from "../../../components/Main"

import config from "../../../config";
import PanelTopbar from "../../../components/PanelTopbar";

export default function Users({ config }) {
    const toast = useToast();
    const token = getCookie("token")


    return (
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Usuários" config={config} />
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


                </Flex>
            </Flex>
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
        const response = await fetch(`${config.BASE_URL}/api/users`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.ok) {
            const getConfig = await fetch(`${config.BASE_URL}/api/configuration/get`)
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