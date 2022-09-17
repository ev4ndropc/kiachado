import { useState, useEffect } from "react";

import {
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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    chakra,
} from "@chakra-ui/react"
import { getCookie } from "cookies-next"
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment'
import 'moment/locale/pt-br'

import { BsPlusCircle } from "react-icons/bs"
import { BiSearch } from 'react-icons/bi'
import { AiFillStar, AiOutlineLink, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import Head from "../../../components/Head"
import Main from "../../../components/Main"

import config from "../../../config";

export default function Home() {
    const toast = useToast();
    const token = getCookie("token")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isLoading, setIsLoading] = useState(false)

    const [products, setProducts] = useState({ isLoading: true, data: [] })
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)

    const [productLink, setProductLink] = useState('')
    const [productInfo, setProductInfo] = useState([])
    const [productName, setProductName] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productPlatform, setProductPlatform] = useState('')
    const [productRating, setProductRating] = useState('')

    const getProducts = async () => {
        const response = await fetch(`/api/products/list?limit=${limit}&offset=${offset}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.ok) {
            setProducts({ data: json.data })
        } else {
            return toast({
                status: "error",
                title: json.message
            })
        }
    }

    const handleGetProductInfo = async () => {
        if (productLink.trim() == '') {
            return toast({
                status: 'error',
                title: 'Preencha o campo com o link do produto.'
            })
        }

        setIsLoading(true)
        const response = await fetch(`/api/products/getInfo?link=${productLink}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await response.json()
        setIsLoading(false)
        if (json.ok) {
            setProductInfo(json.data)
            if (productLink.includes('shopee')) {
                setProductPlatform('Shopee')
                setProductImage(json.data.image)
                setProductName(json.data.name)
                setProductRating(json.data.item_rating.rating_star)
            }
        } else {
            return toast({
                status: 'error',
                title: json.message
            })
        }
    }

    const handleAddProduct = async () => {
        setIsLoading(true)
        const response = await fetch('/api/products/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: productName,
                image: 'https://cf.shopee.com.br/file/' + productImage,
                rating: productRating,
                platform: productPlatform,
                link: productLink
            })
        })

        const json = await response.json()
        setIsLoading(false)

        if (json.ok) {
            toast({
                status: 'success',
                title: json.data
            })
            setProductLink('')
            setProductName('')
            setProductImage('')
            setProductPlatform('')
            setProductRating('')
            setProductInfo([])
            getProducts()
            onClose()
        } else {
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    const handleDeleteProduct  = async (id) => {
        setIsLoading(true)
        const response = await fetch(`/api/products/delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            },
        })

        const json = await response.json()
        setIsLoading(false)

        if (json.ok) {
            toast({
                status: 'success',
                title: json.data
            })
            return getProducts()
        }else{
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Dashboard" />
            <Flex w="100%" h="100%" justifyContent="center" alignItems="center" flexDir="column" p={4}>
                <Flex>
                    <Img maxW="220px" src="/images/logo.png" alt="Logo" />
                </Flex>
                <Flex
                    w="100%"
                    maxW="1366px"
                    maxH="800px"
                    alignItems="flex-start"
                    flexDir="column"
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    mt={4}
                    p={4}
                    minH={40}
                    overflowY="scroll"
                >
                    <Flex w="100%" justifyContent="flex-end">
                        <Button leftIcon={<BsPlusCircle />} colorScheme="orange" onClick={onOpen}>Adicionar Produto</Button>
                    </Flex>

                    {products.isLoading
                        ?
                        <Flex w="100%" justifyContent="center" alignItems="center" mt={4} flexDir="column">
                            <Spinner size="lg" />
                            <Text fontSize="20px">Carregando...</Text>
                        </Flex>
                        : products.data.length == 0

                            ?
                            <Flex w="100%" justifyContent="center" alignItems="center" mt={4} flexDir="column">
                                <Text fontSize="20px">Nenhum produto cadastrado ainda!</Text>
                            </Flex>
                            :
                            <Flex w="100%" mt={4} flexDir="column">
                                <TableContainer>
                                    <Table variant='simple'>
                                        <Thead>
                                            <Tr>
                                                <Th>Id</Th>
                                                <Th>Informações</Th>
                                                <Th>Ações</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {products.data.map((product, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td>
                                                            <Flex alignItems="center" flexDir="row">
                                                                <Text>#{product.id}</Text>
                                                                <Img  ml={4} w="80px" h="80px" minW="80px" minH="80px" src={product.image} alt={product.name} />
                                                            </Flex>
                                                        </Td>
                                                        <Td textTransform="capitalize" >
                                                            <Flex flexDir="column">
                                                                <Flex maxW="400px" overflow="hidden">
                                                                    <Text fontWeight="bold">Nome:</Text> 
                                                                    <Text ml={2} title={product.name}>{product.name}</Text>
                                                                </Flex>
                                                                <Flex>
                                                                    <Text fontWeight="bold">Link:</Text>
                                                                    <chakra.a ml={2} href={product.link} target="_bank" rel="noreferrer"> <AiOutlineLink size="22px"/> </chakra.a>
                                                                </Flex>
                                                                <Flex minW="120px">
                                                                    <Text fontWeight="bold">Nota:</Text>
                                                                    <Flex flexDir="row" alignItems="center" ml={2}>
                                                                        <StarRatingComponent
                                                                            name="stars"
                                                                            starCount={5}
                                                                            value={product.rating}
                                                                            editing={false}
                                                                            renderStarIcon={() => <AiFillStar size="14px" />}
                                                                            onChange={() => null}
                                                                        />
                                                                        <Flex ml={2}>{parseFloat(product.rating).toFixed(1)}</Flex>
                                                                    </Flex>
                                                                </Flex>
                                                                <Flex>
                                                                    <Text fontWeight="bold">Plataforma:</Text>
                                                                    <Text ml={2}>{product.platform}</Text>
                                                                </Flex>
                                                                <Flex>
                                                                    <Text fontWeight="bold">Cliques:</Text>
                                                                    <Text ml={2}>{product.platform}</Text>
                                                                </Flex>
                                                                <Flex>
                                                                    <Text fontWeight="bold">Data de criação:</Text>
                                                                    <Text ml={2}>{moment(product.createdAt).format('LL')}</Text>
                                                                </Flex>

                                                            </Flex>
                                                        </Td>
                                                        <Td>
                                                            <Flex flexDir="row">
                                                                <Button mx={1} colorScheme="blue" leftIcon={<AiOutlineEdit/>}>Editar</Button>
                                                                <Button 
                                                                    mx={1} 
                                                                    colorScheme="red" 
                                                                    onClick={() => handleDeleteProduct(product.id)}
                                                                    leftIcon={<AiOutlineDelete/>}
                                                                >
                                                                    Deletar
                                                                </Button>
                                                            </Flex>
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Adicionar Produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex w="100%" flexDir="column">
                            <FormControl>
                                <FormLabel>Link do produto</FormLabel>
                                <InputGroup>
                                    <Input disabled={isLoading} type="text" value={productLink} onChange={(e) => setProductLink(e.target.value)} />
                                    <InputRightElement>
                                        <IconButton bg="orange.500" p="4px" borderRadius="md" cursor="pointer" color="white" onClick={handleGetProductInfo}>
                                            <BiSearch size="20px" />
                                        </IconButton>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            {productInfo &&
                                productLink.includes('shopee') &&
                                <Flex w="100%" justifyContent="center" alignItems="cente" flexDir="column">
                                    {productImage &&
                                        <Flex>
                                            <Img maxW="320px" src={`https://cf.shopee.com.br/file/${productImage}`} alt="" />
                                        </Flex>
                                    }
                                    {productRating &&
                                        <Flex mt={2}>
                                            <FormControl>
                                                <FormLabel>Nota</FormLabel>
                                                <Flex flexDir="row" alignItems="center">
                                                    <StarRatingComponent
                                                        name="stars"
                                                        starCount={5}
                                                        value={productRating}
                                                        editing={false}
                                                        renderStarIcon={() => <AiFillStar size="20px" />}
                                                        onChange={() => null}
                                                    />
                                                    <Flex ml={2}>{parseFloat(productRating).toFixed(1)}</Flex>
                                                </Flex>
                                            </FormControl>
                                        </Flex>
                                    }
                                    {productName &&
                                        <Flex mt={2}>
                                            <FormControl>
                                                <FormLabel>Nome do produto</FormLabel>
                                                <Input type="text" textTransform="capitalize" value={productName} />
                                            </FormControl>
                                        </Flex>
                                    }
                                </Flex>
                            }
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Fechar</Button>
                        <Button colorScheme="green" mr={3} onClick={handleAddProduct} disabled={productInfo == '' ? true : false}>
                            Adicionar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
            return {
                props: {}
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