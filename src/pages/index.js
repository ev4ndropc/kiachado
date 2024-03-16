import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import Head from '../components/Head'
import Topbar from '../components/Topbar';
import Main from '../components/Main'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard';

import Logo from '../assets/logo.png'
import config from '../config';

export default function Home({ products, config }) {

  const [searchTerm, setSearchTerm] = useState('')
  const [searchList, setSearchList] = useState('')

  useEffect(() => {
    if (products) {
      const newList = [...products]
      const newListFilter = newList.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchList(newListFilter)
    }


  }, [searchTerm])

  return (
    <Main>
      <Head config={config} pageTitle="Lista de produtos" />
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
                Os melhores achados da internet <br />
                <Text as={'span'} color={'orange.400'}>
                  você encontra aqui
                </Text>
              </Heading>
              <Text color={'gray.500'}>
                Nós encontramos e listamos os produtos mais inovadores, com o melhor preço e o melhor vendedor.
                Tudo para que você não tenha dor de cabeça na hora de sua compra.
              </Text>
              <Stack>
                <Input
                  type="search"
                  placeholder="Procurar por produto"
                  borderColor="orange.500"
                  borderRadius={32}
                  size="lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Stack>
            </Stack>
          </Container>

          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
              {searchTerm == '' ? (
                products &&
                products.map(product => {
                  return (
                    <Stack key={product.id}>
                      <ProductCard product={product} />
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

      <Footer />

    </Main>
  )
}

export async function getServerSideProps({ req, res }) {
  try {
    const response = await fetch(`${config.BASE_URL}/api/products/listAll`)
    const json = await response.json()

    const getConfig = await fetch(`${config.BASE_URL}/api/configuration/get`)
    const configJson = await getConfig.json()

    return {
      props: {
        products: json.data,
        config: configJson.data
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }

}
