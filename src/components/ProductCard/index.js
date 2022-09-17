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
} from '@chakra-ui/react';
import StarRatingComponent from 'react-star-rating-component';
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
                    mt={-12}
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
                        filter: 'blur(15px)',
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
                        objectFit={'cover'}
                        src={product.image}
                    />
                </Flex>
                <Stack pt={10} align={'center'}>
                    {product.platform == 'Shopee' &&
                        <Img w="100px" src="/images/shopee-logo.png" alt="Shopee logo"/>
                    }
                    {product.platform == 'Amazon' &&
                        <Img w="100px" src="/images/amazon-logo.png" alt="Amazon logo"/>
                    }
                    <Heading fontSize={'lg'} fontFamily={'body'} textTransform="capitalize" fontWeight={500} noOfLines={2}>
                        {product.name}
                    </Heading>
                    <Flex flexDir="row" alignItems="center">
                        <StarRatingComponent
                            name="stars"
                            starCount={5}
                            value={Number(parseFloat(product.rating).toFixed(1))}
                            editing={false}
                            renderStarIcon={() => <AiFillStar size="20px" />}
                            onChange={() => null}
                        />
                        <Flex ml={2}>{parseFloat(product.rating).toFixed(1)}</Flex>
                    </Flex>
                </Stack>
                <Stack mt={4}>
                    <Button as={Link} href={product.affiliateLink} leftIcon={<BsCart2/>} target="_blank" rel="noreferrer" colorScheme="orange">Comprar agora</Button>
                </Stack>
            </Box>
        </Center>
    );
}