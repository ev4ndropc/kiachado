import Image from 'next/image';
import { Flex, Text } from '@chakra-ui/react'

import Head from '../components/Head'
import Topbar from '../components/Topbar';
import Main from '../components/Main'
import Footer from '../components/Footer'

import Logo from '../assets/logo.png'

export default function Home() {
  return (
    <Main>
      <Head/>
      <Topbar/>

      <Flex h="100%" bg="white">
      </Flex>

      <Footer/>

    </Main>
  )
}
