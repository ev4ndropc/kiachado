import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    Img,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            target='_bank'
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'all 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
                transform: 'scale(1.1)',
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function Footer({ config }) {
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubmitNewsletter = async () => {
        if (email.trim() == '' || !email.includes('@')) {
            return toast({
                status: 'error',
                title: 'E-mail inválid, por favor, tente novamente',
                isClosable: true,

            })
        }
        setIsLoading(true)
        const response = await fetch(`/api/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        const json = await response.json()
        setIsLoading(false)
        if (json.ok) {
            setEmail('')
            return toast({
                status: 'success',
                title: 'Obrigado por assinar nossa newsletter!',
                description: 'Não se preocupe, nós não enviamos SPAM.',
                isClosable: true,

            })
        } else {
            return toast({
                status: 'error',
                title: 'Ocorreu um erro, tente novamente por favor.',
                isClosable: true,
            })
        }
    }

    return (
        <Box
            bg="linear-gradient(62deg, #FBAB7E 0%, #F7CE68 50%, #F7CE68 100%)"
        >
            <Container as={Stack} maxW={'1366px'} py={10}>
                <SimpleGrid
                    className="container_footer"
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
                    spacing={8}>
                    <Stack spacing={6} className="footer_col">
                        <Box>
                            <Img w={12} src={config && config?.logo ? `/images/${config.logo}` : '/images/logo.png'} />
                        </Box>
                        <Text fontSize={'sm'} className="copyright">
                            {config && config?.copyright ? config.copyright : ''}
                        </Text>
                        <Stack direction={'row'} spacing={2}>
                            {config && config?.social_networks?.facebook &&
                                <SocialButton label={'Facebook'} href={config?.social_networks?.facebook} target="_bank">
                                    <Img src="/images/social_networks/facebook.png" w="20px" />
                                </SocialButton>
                            }
                            {config && config?.social_networks?.instagram &&
                                <SocialButton label={'Instagram'} href={config?.social_networks?.instagram} target="_bank">
                                    <Img src="/images/social_networks/instagram.png" w="20px" />
                                </SocialButton>
                            }
                            {config && config?.social_networks?.whatsapp &&
                                <SocialButton label={'Whatsapp'} href={config?.social_networks?.whatsapp} target="_bank">
                                    <Img src="/images/social_networks/whatsapp.png" w="18px" />
                                </SocialButton>
                            }
                            {config && config?.social_networks?.youtube &&
                                <SocialButton label={'Youtube'} href={config?.social_networks?.youtube} target="_bank">
                                    <Img src="/images/social_networks/youtube.png" w="20px" />
                                </SocialButton>
                            }
                            {config && config?.social_networks?.tiktok &&
                                <SocialButton label={'Tiktok'} href={config?.social_networks?.tiktok} target="_bank">
                                    <Img src="/images/social_networks/tiktok.png" w="20px" />
                                </SocialButton>
                            }
                            {config && config?.social_networks?.kwai &&
                                <SocialButton label={'Kwai'} href={config?.social_networks?.kwai} target="_bank">
                                    <Img src="/images/social_networks/kwai.png" w="18px" />
                                </SocialButton>
                            }
                        </Stack>
                    </Stack>
                    <Stack align={'center'} className="footer_col">

                    </Stack>
                    <Stack align={'center'} className="footer_col">

                    </Stack>
                    <Stack align={'flex-end'} className="footer_col">
                        <ListHeader>Mantenha-se atualizado</ListHeader>
                        <Stack direction={'row'}>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                colorScheme="orange"
                                bg="white"
                                placeholder={'Seu endereço de email'}
                                required
                                disabled={isLoading}
                            />
                            <IconButton
                                onClick={handleSubmitNewsletter}
                                bg={useColorModeValue('orange.400', 'orange.800')}
                                color={useColorModeValue('white', 'gray.800')}
                                isLoading={isLoading}
                                _hover={{
                                    bg: 'orange.600',
                                }}
                                aria-label="Subscribe"
                                icon={<BiMailSend />}
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}