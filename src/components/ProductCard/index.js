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
    Icon
} from '@chakra-ui/react';
import Rating from 'react-rating';
import { AiFillStar } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'

export default function ProductCard({ product }) {
    return (
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
                    {product.platform == 'Shopee' &&
                        <Img w="100px" src="/images/shopee-logo.png" alt="Shopee logo" />
                    }
                    {product.platform == 'Amazon' &&
                        <Img w="100px" src="/images/amazon-logo.png" alt="Amazon logo" />
                    }
                    <Heading fontSize={'lg'} fontFamily={'body'} textTransform="capitalize" fontWeight={500} noOfLines={2}>
                        {product.name}
                    </Heading>
                    <Flex flexDir="row" alignItems="center">
                        <Rating
                            initialRating={Number(parseFloat(product.rating).toFixed(1))}
                            emptySymbol={<Icon w={6} h={6} as={AiFillStar} />}
                            fullSymbol={<Icon w={6} h={6} color="yellow.500" as={AiFillStar} />}
                            onChange={(rate) => null}
                            quiet
                        />
                        <Flex ml={2}>{parseFloat(product.rating).toFixed(1)}</Flex>
                    </Flex>
                </Stack>
                <Stack mt={4}>
                    <Button as={Link} href={product.affiliateLink} leftIcon={<BsCart2 />} target="_blank" rel="noreferrer" colorScheme="orange">Comprar agora</Button>
                </Stack>
            </Box>
        </Center>
    );
}