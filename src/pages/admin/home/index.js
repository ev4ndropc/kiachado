import { useState } from 'react';
import Image from 'next/image';
import { Flex, Text, chakra, FormControl, FormLabel, Input, Button, Img, useToast } from '@chakra-ui/react'
import { getCookie } from 'cookies-next'


import Head from '../../../components/Head'
import Topbar from '../../../components/Topbar';
import Main from '../../../components/Main'
import Footer from '../../../components/Footer'

import Logo from '../../../assets/logo.png'

export default function Home() {
    const toast = useToast();


    return(
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Login"/>
            <Text>Home</Text>
        </Main>
    )
}

export async function getServerSideProps({ req, res }) {
    const token = getCookie('token', { req, res });
    
    if(!token){
        return {
            redirect: {
                permanent: false,
                destination: '/auth/login'
              }
          }
      }

    return {
      props: {}, // will be passed to the page component as props
    }
  }