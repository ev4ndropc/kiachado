import { Box, Button, Container, Flex, Heading, Icon, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import Head from '../components/Head'
import Topbar from '../components/Topbar';
import Main from '../components/Main'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard';

import Logo from '../assets/logo.png'
import config from '../config';

export default function Home({ products }) {
  return (
    <Main>
      <Head />
      <Topbar />

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
              py={{ base: 20, md: 36 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
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
            </Stack>
          </Container>

          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
              {products.map(product => {
                return (
                  <Stack key={product.id}>
                    <ProductCard product={product} />
                  </Stack>
                )
              })}
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

    return {
      props: {
        products: json.data
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }

}
