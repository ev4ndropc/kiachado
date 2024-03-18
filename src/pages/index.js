import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'

import Head from '../components/Head'
import Topbar from '../components/Topbar';
import Main from '../components/Main'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard';
import parse from 'html-react-parser';

import Logo from '../assets/logo.png'
import config from '../config';
import { BsSearch } from 'react-icons/bs';
import Reviews from '../components/Reviews';

export default function Home({ products, config }) {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchList, setSearchList] = useState('')

  useEffect(() => {
    if (products) {

      if (!isNaN(parseFloat(searchTerm)) && isFinite(searchTerm)) {
        const newList = [...products]
        const newListFilter = newList.filter(product => product.id == searchTerm)
        setSearchList(newListFilter)
      } else {
        const newList = [...products]
        const newListFilter = newList.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchList(newListFilter)
      }
    }


  }, [searchTerm])

  return (
    <Main>
      <Head config={config} pageTitle="Inicio" />
      <Topbar config={config} />

      <Flex bg="white" justifyContent="center" alignItems="center" >
        <Flex
          w="100%"
          maxW="1366px"
          flexDir="column"
        >
          <Container maxW={'3xl'}>
            <Stack
              as={Box}
              textAlign={'center'}
              spacing={{ base: 8, md: 14 }}
              py={20}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                fontFamily="'Poppins', sans-serif!important"
                lineHeight={'110%'}>
                {config && config?.home_title ? parse(config.home_title) : 'Os melhores achados da internet'} <br />
              </Heading>
              <Text color={'gray.500'}>
                {config && config?.home_subtitle ? parse(config.home_subtitle) : 'Nós encontramos e listamos os produtos mais inovadores, com o melhor preço e o melhor vendedor.Tudo para que você não tenha dor de cabeça na hora de sua compra.'}
              </Text>
              <InputGroup className='search-product'>
                <InputLeftElement mt={1}>
                  <Icon
                    as={BsSearch}
                    color="gray.300"
                  />
                </InputLeftElement>
                <Input
                  type="search"
                  placeholder="Procurar por produto"
                  borderColor="orange.500"
                  borderRadius={32}
                  size="lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Stack>
          </Container>

          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
              {searchTerm == '' ? (
                products &&
                products.map(product => {
                  return (
                    <Stack key={product.id}>
                      <ProductCard product={product} config={config} />
                    </Stack>
                  )
                })
              ) :
                (
                  searchList.map(product => {
                    return (
                      <Stack key={product.id}>
                        <ProductCard product={product} />
                      </Stack>
                    )
                  })
                )
              }
            </SimpleGrid>
          </Box>

        </Flex>
      </Flex>

      <Footer config={config} />
    </Main>
  )
}


export async function getServerSideProps({ req, res }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/listAll`)
    const json = await response.json()

    const getConfig = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/configuration/get`)
    const configJson = await getConfig.json()

    return {
      props: {
        products: json.data,
        config: configJson.data
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        products: [],
        config: {}
      }
    }
  }

}
