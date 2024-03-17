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

export default function Products({ config }) {
    const toast = useToast();
    const token = getCookie("token")

    const { isOpen: isOpenAddProduct, onOpen: onOpenAddProduct, onClose: onCloseAddProduct } = useDisclosure()
    const { isOpen: isOpenEditProduct, onOpen: onOpenEditProduct, onClose: onCloseEditProduct } = useDisclosure()
    const { isOpen: isOpenDeleteAlert, onOpen: onOpenDeleteAlert, onClose: onCloseDeleteAlert } = useDisclosure()

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
    const [productAffiliateLink, setProductAffiliateLink] = useState('')
    const [deleteProductID, setDeleteProductID] = useState('')

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
            } else if (productLink.includes('amazon')) {
                setProductPlatform('Amazon')
                setProductImage(json.data.productImage)
                setProductName(json.data.productName)
                setProductRating(parseFloat(json.data.productRating.replace(',', '.')).toFixed(1))
            } else {
                return toast({
                    status: 'error',
                    title: 'Link de produto inválido.'
                })
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
        let data = null

        if (productPlatform == 'Shopee') {
            data = {
                name: productName,
                image: 'https://cf.shopee.com.br/file/' + productImage,
                rating: parseFloat(productRating).toFixed(1),
                platform: productPlatform,
                link: productLink
            }
        } else if (productPlatform == 'Amazon') {
            data = {
                name: productName,
                image: productImage,
                rating: parseFloat(productRating).toFixed(1),
                platform: productPlatform,
                link: productLink
            }
        }

        const response = await fetch('/api/products/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
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
            onCloseAddProduct()
        } else {
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    const openModalEdit = async (id) => {
        const response = await fetch(`/api/products/getInfo?id=${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.ok) {
            setProductInfo(json.data)
            setProductName(json.data.name)
            setProductLink(json.data.link)
            setProductImage(json.data.image)
            setProductRating(json.data.rating)
            setProductPlatform(json.data.platform)
            setProductAffiliateLink(json.data.affiliateLink)
            onOpenEditProduct()
        } else {
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    const handleEditProduct = async () => {
        const productId = productInfo.id
        setIsLoading(true)

        const response = await fetch('/api/products/edit', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                name: productName,
                link: productLink,
                affiliateLink: productAffiliateLink
            })
        })

        const json = await response.json()
        setIsLoading(false)

        if (json.ok) {
            toast({
                status: 'success',
                title: 'Produto editado com sucesso!'
            })
            getProducts()
            return onCloseModal()
        } else {
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    const handleDeleteProduct = async (id) => {
        setIsLoading(true)
        const response = await fetch(`/api/products/delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            },
        })

        setIsLoading(false)
        const json = await response.json()

        if (json.ok) {
            toast({
                status: 'success',
                title: json.data
            })
            onCloseModal()
            return getProducts()
        } else {
            onCloseModal()
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    const handleCopyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text)
        return toast({
            status: 'success',
            title: 'Link copiado para a área de transferência.'
        })
    }

    const onCloseModal = () => {
        onCloseAddProduct()
        onCloseEditProduct()
        onCloseDeleteAlert()
        setProductInfo([])
        setProductLink('')
        setProductImage('')
        setProductName('')
        setProductRating('')
        setProductPlatform('')
        setDeleteProductID(null)

    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Produtos" config={config} />
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
                    overflowY="hidden"
                >
                    <Flex w="100%" className="add-product" justifyContent="space-between" alignItems="center">
                        <Text>Produtos cadastrados: <chakra.span fontWeight="bold">{products.data.length}</chakra.span></Text>
                        <Button leftIcon={<BsPlusCircle />} color={config && config?.theme?.light ? config.theme.light : 'orange'} background={config && config?.theme?.primary ? config.theme.primary : 'orange'} onClick={onOpenAddProduct}>Adicionar Produto</Button>
                    </Flex>

                    {products.isLoading
                        ?
                        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center" mt={4} flexDir="column">
                            <Spinner size="lg" />
                            <Text fontSize="20px" mt={2}>Carregando...</Text>
                        </Flex>
                        : products.data.length == 0

                            ?
                            <Flex w="100%" h="100vh" justifyContent="center" alignItems="center" mt={4} flexDir="column">
                                <Text fontSize="20px">Nenhum produto cadastrado ainda!</Text>
                            </Flex>
                            :
                            <Flex w="100%" mt={4} flexDir="column" overflow="scroll">
                                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                                    {products.data.map((product, index) => {
                                        return (
                                            <Box key={index} borderWidth="1px" borderRadius="lg" bg="white" overflow="hidden" boxShadow="md">
                                                <Center mt={6}>
                                                    <Img w="150px" h="150px" objectFit="contain" src={product.image} alt={product.name} />
                                                </Center>
                                                <Box p="6">

                                                    <VStack d="flex" alignItems="baseline" h="42px">
                                                        <Tooltip label={product.name}>
                                                            <Heading fontSize={'lg'} fontFamily={'body'} textTransform="capitalize" fontWeight={500} noOfLines={2}>
                                                                {product.name}
                                                            </Heading>
                                                        </Tooltip>
                                                    </VStack>

                                                    <Divider mt={2} />

                                                    <HStack mt={2} alignItems="center">
                                                        <Text fontWeight="bold">Id:</Text>
                                                        <Text fontWeight="bold" fontSize="lg" mr={2}>{product.id}</Text>
                                                    </HStack>

                                                    <Divider mt={2} />

                                                    <Flex mt={2} alignItems="center">
                                                        <Text fontWeight="bold">Link:</Text>
                                                        <HStack>
                                                            <Link ml={2} href={product.link} target="_blank" rel="noreferrer">
                                                                <AiOutlineLink size="22px" />
                                                            </Link>
                                                            <Link ml={2} onClick={() => handleCopyToClipboard(product.link)}>
                                                                <AiOutlineCopy size="22px" />
                                                            </Link>
                                                        </HStack>
                                                    </Flex>

                                                    <Divider mt={2} />

                                                    <Flex mt={2} alignItems="center">
                                                        <Text fontWeight="bold">Link de afiliado:</Text>
                                                        {product.affiliateLink ?
                                                            <HStack>
                                                                <Link ml={2} href={product.affiliateLink} target="_blank" rel="noreferrer">
                                                                    <AiOutlineLink size="22px" />
                                                                </Link>
                                                                <Link ml={2} onClick={() => handleCopyToClipboard(product.affiliateLink)}>
                                                                    <AiOutlineCopy size="22px" />
                                                                </Link>
                                                            </HStack>
                                                            :
                                                            <Badge ml={2} colorScheme="red" variant="outline">Sem link</Badge>
                                                        }
                                                    </Flex>

                                                    <Divider mt={2} />

                                                    <Flex mt={2} alignItems="center">
                                                        <Text fontWeight="bold">Nota:</Text>
                                                        <Flex ml={1} mt={1}>
                                                            <Rating
                                                                initialRating={Number(parseFloat(product.rating).toFixed(1))}
                                                                emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                                                                fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                                                                onChange={(rate) => null}
                                                                quiet
                                                            />
                                                        </Flex>
                                                        <Text ml={2}>{parseFloat(product.rating).toFixed(1)}</Text>
                                                    </Flex>

                                                    <Divider mt={2} />

                                                    <HStack mt={2} alignItems="center">
                                                        <Text fontWeight="bold">Plataforma:</Text>
                                                        <Img mt={"3!important"} maxW="64px" src={product.platform === 'Shopee' ? "/images/shopee-logo.png" : "/images/amazon-logo.png"} alt={`${product.platform} logo`} />
                                                    </HStack>
                                                    <Flex mt={2}>
                                                        <Text fontWeight="bold">Cliques:</Text>
                                                        <Text ml={2}>{product.clicks}</Text>
                                                    </Flex>

                                                    <Divider mt={2} />

                                                    <Flex mt={2}>
                                                        <Text fontWeight="bold">Data de criação:</Text>
                                                        <Text ml={2}>{moment(product.created_at).format('LL')}</Text>
                                                    </Flex>

                                                    <Divider mt={2} />

                                                    <Flex mt={4} justifyContent="center">
                                                        <Button mr={2} colorScheme="blue" className="edit-button" leftIcon={<AiOutlineEdit />} onClick={() => openModalEdit(product.id)}>Editar</Button>
                                                        <Button colorScheme="red" className="delete-button" leftIcon={<AiOutlineDelete />} onClick={() => {
                                                            setDeleteProductID(product.id)
                                                            onOpenDeleteAlert()
                                                        }}>Deletar</Button>
                                                    </Flex>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Grid>
                            </Flex>
                    }
                </Flex>
            </Flex>

            <AlertDialog
                isOpen={isOpenDeleteAlert}
                onClose={onCloseDeleteAlert}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Deletar Produto
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza? Você não pode desfazer esta ação posteriormente.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onCloseDeleteAlert}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' className="delete-button" onClick={() => handleDeleteProduct(deleteProductID)} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Modal isOpen={isOpenAddProduct} onClose={onCloseModal} size="lg">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Adicionar Produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex w="100%" flexDir="column">
                            <FormControl mb={4}>
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
                                productLink.includes('shopee')
                                ?
                                <Flex w="100%" justifyContent="center" alignItems="cente" flexDir="column" mt={6}>
                                    {productImage &&
                                        <Flex flexDir="column">
                                            <FormLabel>Imagem</FormLabel>
                                            <Img w="150px" h="150px" objectFit="contain" src={`https://cf.shopee.com.br/file/${productImage}`} alt="" />
                                        </Flex>
                                    }
                                    {productName &&
                                        <Flex mt={4}>
                                            <FormControl>
                                                <FormLabel>Nome do produto</FormLabel>
                                                <Input type="text" textTransform="capitalize" value={productName} />
                                            </FormControl>
                                        </Flex>
                                    }
                                    {productRating &&
                                        <Flex mt={4}>
                                            <FormControl>
                                                <FormLabel>Nota</FormLabel>
                                                <Flex flexDir="row" alignItems="center">
                                                    <Rating
                                                        initialRating={Number(parseFloat(productRating).toFixed(1))}
                                                        emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                                                        fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                                                        onChange={(rate) => null}
                                                        quiet
                                                    />
                                                    <Flex ml={2}>{parseFloat(productRating).toFixed(1)}</Flex>
                                                </Flex>
                                            </FormControl>
                                        </Flex>
                                    }
                                    {productPlatform &&
                                        <Flex mt={4}>
                                            <FormControl>
                                                <FormLabel>Plataforma</FormLabel>
                                                <Img maxW="120px" src="/images/shopee-logo.png" alt="Shopee logo" />
                                            </FormControl>
                                        </Flex>
                                    }
                                </Flex>
                                :
                                <Flex w="100%" justifyContent="center" alignItems="cente" flexDir="column" mt={6}>
                                    {productImage &&
                                        <Flex flexDir="column">
                                            <FormLabel>Imagem</FormLabel>
                                            <Img w="150px" h="150px" objectFit="contain" src={productImage} alt="" />
                                        </Flex>
                                    }
                                    {productName &&
                                        <Flex mt={4}>
                                            <FormControl>
                                                <FormLabel>Nome do produto</FormLabel>
                                                <Input type="text" textTransform="capitalize" value={productName} />
                                            </FormControl>
                                        </Flex>
                                    }
                                    {productRating &&
                                        <Flex mt={4}>
                                            <FormControl>
                                                <FormLabel>Nota</FormLabel>
                                                <Flex flexDir="row" alignItems="center">
                                                    <Rating
                                                        initialRating={Number(parseFloat(productRating).toFixed(1))}
                                                        emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                                                        fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                                                        onChange={(rate) => null}
                                                        quiet
                                                    />

                                                    <Flex ml={2}>{parseFloat(productRating).toFixed(1)}</Flex>
                                                </Flex>
                                            </FormControl>
                                        </Flex>
                                    }
                                    {productPlatform &&
                                        <Flex mt={4}>
                                            <FormControl>
                                                <FormLabel>Plataforma</FormLabel>
                                                <Img maxW="120px" src="/images/amazon-logo.png" alt="Amazon logo" />
                                            </FormControl>
                                        </Flex>
                                    }
                                </Flex>

                            }
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onCloseAddProduct}>Fechar</Button>
                        <Button colorScheme="green" mr={3} onClick={handleAddProduct} disabled={productInfo == '' ? true : false}>
                            Adicionar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal isOpen={isOpenEditProduct} onClose={onCloseModal} size="lg">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Editar Produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex w="100%" flexDir="column">
                            {productLink.includes('shopee')
                                ?
                                <Flex w="100%" justifyContent="center" alignItems="cente" flexDir="column">

                                    <Flex>
                                        <Img w="150px" h="150px" objectFit="contain" src={`https://cf.shopee.com.br/file/${productImage}`} alt="" />
                                    </Flex>


                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Link do produto</FormLabel>
                                            <Input type="text" value={productLink} onChange={(e) => setProductLink(e.target.value)} />
                                        </FormControl>
                                    </Flex>


                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Link de afiliado</FormLabel>
                                            <Input type="text" placeholder="Seu link de afiliado" value={productAffiliateLink ? productAffiliateLink : ''} onChange={(e) => setProductAffiliateLink(e.target.value)} />
                                        </FormControl>
                                    </Flex>

                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Nome do produto</FormLabel>
                                            <Input type="text" textTransform="capitalize" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                        </FormControl>
                                    </Flex>

                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Nota</FormLabel>
                                            <Flex flexDir="row" alignItems="center">
                                                <Rating
                                                    initialRating={Number(parseFloat(productRating).toFixed(1))}
                                                    emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                                                    fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                                                    onChange={(rate) => null}
                                                    quiet
                                                />
                                                <Flex ml={2}>{parseFloat(productRating).toFixed(1)}</Flex>
                                            </Flex>
                                        </FormControl>
                                    </Flex>

                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Plataforma</FormLabel>
                                            <Img maxW="120px" src="/images/shopee-logo.png" alt="Shopee logo" />
                                        </FormControl>
                                    </Flex>

                                </Flex>
                                :
                                <Flex w="100%" justifyContent="center" alignItems="cente" flexDir="column">

                                    <Flex>
                                        <Img maxW="220px" src={productImage} alt={productName} />
                                    </Flex>


                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Link do produto</FormLabel>
                                            <Input type="text" value={productLink} onChange={(e) => setProductLink(e.target.value)} />
                                        </FormControl>
                                    </Flex>


                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Link de afiliado</FormLabel>
                                            <Input type="text" placeholder="Seu link de afiliado" value={productAffiliateLink ? productAffiliateLink : ''} onChange={(e) => setProductAffiliateLink(e.target.value)} />
                                        </FormControl>
                                    </Flex>

                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Nome do produto</FormLabel>
                                            <Input type="text" textTransform="capitalize" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                        </FormControl>
                                    </Flex>

                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Nota</FormLabel>
                                            <Flex flexDir="row" alignItems="center">
                                                <Rating
                                                    initialRating={Number(parseFloat(productRating).toFixed(1))}
                                                    emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                                                    fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                                                    onChange={(rate) => null}
                                                    quiet
                                                />
                                                <Flex ml={2}>{parseFloat(productRating).toFixed(1)}</Flex>
                                            </Flex>
                                        </FormControl>
                                    </Flex>

                                    <Flex mt={2}>
                                        <FormControl>
                                            <FormLabel>Plataforma</FormLabel>
                                            <Img maxW="120px" src="/images/amazon-logo.png" alt="Shopee logo" />
                                        </FormControl>
                                    </Flex>

                                </Flex>

                            }
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onCloseEditProduct}>Fechar</Button>
                        <Button colorScheme="green" mr={3} onClick={handleEditProduct}>
                            Salvar edição
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
                destination: "/admin/login?errorMessage=Por favor, faça o login",
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
                    destination: "/admin/login?errorMessage=" + json.message,
                }
            }
        }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login?errorMessage=" + error.message,
                query: {
                    errorMessage: error.message
                }
            }
        }
    }

}