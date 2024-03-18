import { useState } from 'react';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Link,
    Stack,
    Image,
    Img,
    Flex,
    Button,
    Icon,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import Rating from 'react-rating';
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'
import Reviews from '../Reviews';

export default function ProductCard({ product, config }) {

    const { isOpen: isOpenViewReviews, onOpen: onOpenViewReviews, onClose: onCloseViewReviews } = useDisclosure()
    const [productReviews, setProductReviews] = useState([])

    const openModalReviews = async (productSelected) => {
        setProductReviews(productSelected.reviews)
        onOpenViewReviews()
    }

    return (
        <>
            <Center py={12}>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Flex
                        rounded={'lg'}
                        pos={'relative'}
                        height={'161px'}
                        justifyContent={'center'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${product.image})`,
                            filter: 'blur(25px)',
                            opacity: 0.0,
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(20px)',
                            },
                        }}>
                        <Image
                            rounded={'lg'}
                            height={161}
                            width={197}
                            objectFit={'contain'}
                            src={product.image}
                        />
                    </Flex>
                    <Stack pt={10} align={'center'}>
                        {product.platform == 'shopee' &&
                            <Img w="72px" src="/images/shopee-logo.png" alt="Shopee logo" />
                        }
                        {product.platform == 'amazon' &&
                            <Img w="72px" src="/images/amazon-logo.png" alt="Amazon logo" />
                        }
                        <Heading fontSize={'lg'} fontFamily={'body'} textTransform="capitalize" fontWeight={500} noOfLines={2}>
                            {product.name}
                        </Heading>
                        {config && config.show_ratings &&
                            <Flex flexDir="row" alignItems="center">
                                <Rating
                                    initialRating={Number(parseFloat(product.rating).toFixed(1))}
                                    emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                                    fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                                    onChange={(rate) => null}
                                    readonly
                                    quiet
                                />
                                <Flex ml={2}>{parseFloat(product.rating).toFixed(1)}</Flex>
                            </Flex>
                        }
                    </Stack>
                    {product?.reviews &&
                        product?.reviews?.length > 0 &&
                        config && config.show_reviews &&
                        <Flex
                            mt={2}
                            alignItems="center"
                            justifyContent="center"
                            onClick={() => product?.reviews.includes(null) ? null : (product.reviews.length > 0 ? openModalReviews(product) : null)}
                            cursor="pointer"
                            borderWidth="2px"
                            borderColor="transparent"
                            ml="-2px"
                            _hover={{
                                borderColor: config && config.primaryColor ? config.primaryColor : 'blue.500',
                                borderRadius: 'md',
                                color: config && config.primaryColor ? config.primaryColor : 'blue.500',
                            }}
                        >
                            <Text ml={2}>
                                {product?.reviews.includes(null) ? 'Sem' : product?.reviews.length} {product?.reviews.length === 1 ? 'avalição' : 'avalições'}
                            </Text>
                            <Icon ml={2} as={AiFillEye} />
                        </Flex>

                    }
                    <Stack mt={4}>
                        <Button className='btn' as={Link} href={product.affiliateLink ? product.affiliateLink : `/${product.id}`} leftIcon={<BsCart2 />} target="_blank" rel="noreferrer" colorScheme="orange">Comprar agora</Button>
                    </Stack>
                </Box>
            </Center>
            <Modal isOpen={isOpenViewReviews} onClose={onCloseViewReviews} size="lg">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Avaliações</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {(productReviews && productReviews.length > 0) &&
                            <Reviews reviews={productReviews} />
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" className="edit-button" onClick={onCloseViewReviews}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}