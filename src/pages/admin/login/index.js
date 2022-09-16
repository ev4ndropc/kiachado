import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Flex, Text, chakra, FormControl, FormLabel, Input, Button, Img, useToast } from '@chakra-ui/react'
import { setCookie } from 'cookies-next'


import Head from '../../../components/Head'
import Topbar from '../../../components/Topbar'
import Main from '../../../components/Main'
import Footer from '../../../components/Footer'

import Logo from '../../../assets/logo.png'

export default function Login() {
    const toast = useToast()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const json = await response.json()
            setIsLoading(false)

            if(json.ok) {
                toast({
                    status: 'success',
                    description: json.message,
                    duration: 3000
                })
                setCookie('token', json.token, { maxAge: 1000*60*60*24*3 })
                return router.push('/admin/home')
            }else{
                return toast({
                    status: 'error',
                    description: json.message,
                    duration: 3000
                })
            }

        }catch(error) {
            console.log(error)
        }
    }
    return(
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Login"/>

            <Flex  w="100%" maxW="420px" flexDir="column">
                <Flex justifyContent="center" alignItems="center">
                    <Img maxW="180px" src="/images/logo.png" alt="Logo"/>
                </Flex>
                <Flex w="100%" borderRadius="md" boxShadow="md" p={4} bg="white" mt={4}>
                    <chakra.form w="100%" onSubmit={handleLogin}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                disabled={isLoading}
                            />
                        </FormControl>
                        <FormControl mt={2}>
                            <FormLabel>Senha</FormLabel>
                            <Input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="***********"
                                disabled={isLoading}
                            />
                        </FormControl>

                        <Flex mt={4} w="100%">
                            <Button isLoading={isLoading} loadingText="Aguarde..." w="100%" type="submit" colorScheme="orange">Entrar</Button>
                        </Flex>
                    </chakra.form>
                </Flex>
            </Flex>
        </Main>
    )
}