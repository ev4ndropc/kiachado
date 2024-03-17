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
import config from '../../../config'

export default function Login({ config }) {
    const toast = useToast()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
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
            setIsLoading(false)
            const json = await response.json()

            if (json.ok) {
                toast({
                    status: 'success',
                    description: json.message,
                    duration: 3000
                })
                setCookie('token', json.token, { maxAge: 1000 * 60 * 60 * 24 * 3 })
                return router.push('/admin/produtos')
            } else {
                return toast({
                    status: 'error',
                    description: json.message,
                    duration: 3000
                })
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            return toast({
                status: 'error',
                description: error.message,
                duration: 3000
            })
        }
    }
    return (
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Login" config={config} />

            <Flex w="100%" maxW="420px" flexDir="column" p={4}>
                <Flex justifyContent="center" alignItems="center">
                    <Img w={16} src={config && config?.logo ? `${config.logo}` : "/images/logo.png"} alt="Logo" />
                </Flex>
                <Flex w="100%" borderRadius="md" boxShadow="md" p={8} bg="white" mt={4}>
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

export async function getServerSideProps({ req, res }) {

    try {
        const getConfig = await fetch(`${process.env.BASE_URL}/api/configuration/get`)
        const configJson = await getConfig.json()
        return {
            props: {
                config: configJson.data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

}