// pages/redirect.js

import { useState, useEffect } from 'react';
import { Box, Center, Heading, Text, chakra } from '@chakra-ui/react';
import Head from 'next/head';

const RedirectPage = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);


        if (countdown === 0) {
            window.location.href = 'https://kiwify.app/LmL6p6n?afid=gaDlEznN';
        }

        return () => clearInterval(timer);
    }, [countdown]);

    return (
        <Center h="100vh" bgGradient="linear(to-b, #f7f7f7, #f0f0f0)">
            <Head>
                <title>Redirecionando...</title>
            </Head>
            <Box maxW="md" p={8} bg="white" rounded="lg" shadow="md">
                <Heading as="h1" size="xl" mb={4} color="gray.800" textAlign="center">Redirecionando em <chakra.span color="red.500">{countdown}</chakra.span> segundos...</Heading>
                <Text fontSize="lg" color="gray.600" textAlign="center">Aguarde um momento, você será redirecionado em breve.</Text>
            </Box>
        </Center>
    );
};

export default RedirectPage;
