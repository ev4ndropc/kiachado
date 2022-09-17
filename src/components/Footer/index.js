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
    useColorModeValue,
    Img,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const Logo = (props) => {
    return (
        <Img w={48} h={10} src="/images/logo.png" alt="Logo" />
    );
};

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
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
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

export default function Footer() {
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
                            <Logo color={useColorModeValue('gray.700', 'white')} />
                        </Box>
                        <Text fontSize={'sm'} className="copyright">
                            © 2020-2022 Ki Achado. Todos os direitos reservados
                        </Text>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <FaTiktok />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                                <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <FaInstagram />
                            </SocialButton>
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
                                colorScheme="orange"
                                bg="white"
                                placeholder={'Seu endereço de email'}
                            />
                            <IconButton
                                bg={useColorModeValue('orange.400', 'orange.800')}
                                color={useColorModeValue('white', 'gray.800')}
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