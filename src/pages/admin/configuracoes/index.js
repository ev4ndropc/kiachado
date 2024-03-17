import { useState, useEffect, useRef } from "react";

import {
    chakra,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Img,
    useToast,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    InputGroup,
    InputRightElement,
    IconButton,
    Box,
    Grid,
    Link,
    HStack,
    VStack,
    Divider,
    Center,
    Tooltip,
    AlertDialog,
    AlertDialogBody,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    Icon,
    Heading,
    Badge,
    UnorderedList,
    ListItem,
    Textarea,
    Tag,
    TagLabel,
    FormHelperText
} from "@chakra-ui/react"
import { getCookie } from "cookies-next"
import CodeMirror from '@uiw/react-codemirror';
import { javascript, } from '@codemirror/lang-javascript';
import { less } from '@codemirror/lang-less'
import { darcula } from "@uiw/codemirror-theme-darcula";
import Compressor from 'compressorjs';

import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoLogoYoutube } from "react-icons/io";
import { FaTiktok } from "react-icons/fa6";

import Head from "../../../components/Head"
import Main from "../../../components/Main"

import config from "../../../config";
import PanelTopbar from "../../../components/PanelTopbar";


export default function Configuration({ config }) {
    const toast = useToast();
    const token = getCookie("token")

    const [isLoading, setIsLoading] = useState(false);

    const logoRef = useRef(null);
    const faviconRef = useRef(null);
    const colorPrimaryRef = useRef(null);
    const colorSecondaryRef = useRef(null);
    const colorLightRef = useRef(null);
    const colorDarkRef = useRef(null);

    const [siteName, setSiteName] = useState(config && config.site_name ? config.site_name : "");
    const [siteDescription, setSiteDescription] = useState(config && config.site_description ? config.site_description : "");
    const [siteKeys, setSiteKeys] = useState(config && config.site_keys ? config.site_keys.split(",").map(chave => chave.trim()) : []);
    const [siteKeysText, setSiteKeysText] = useState(config && config.site_keys ? config.site_keys : "");
    const [siteLogo, setSiteLogo] = useState(config && config.logo ? config.logo : "")
    const [siteFavicon, setSiteFavicon] = useState(config && config.favicon ? config.favicon : "")
    const [customJavascript, setCustomJavascript] = useState(config && config.custom_javascript ? config.custom_javascript : "console.log('hello world!');")
    const [customCss, setCustomCss] = useState(config && config.custom_css ? config.custom_css : "")
    const [copyright, setCopyright] = useState(config && config.copyright ? config.copyright : "")
    const [pixel, setPixel] = useState(config && config.pixel ? config.pixel : "")
    const [socialNetworks, setSocialNetworks] = useState(config && config.social_networks ? config.social_networks : {})
    const [Facebook, setFacebook] = useState(config && config.social_networks ? config?.social_networks?.facebook : "")
    const [Instagram, setInstagram] = useState(config && config.social_networks ? config?.social_networks?.instagram : "")
    const [Whatsapp, setWhatsapp] = useState(config && config.social_networks ? config?.social_networks?.whatsapp : "")
    const [Youtube, setYoutube] = useState(config && config.social_networks ? config?.social_networks?.youtube : "")
    const [Tiktok, setTiktok] = useState(config && config.social_networks ? config?.social_networks?.tiktok : "")
    const [Kwai, setKwai] = useState(config && config.social_networks ? config?.social_networks?.kwai : "")

    const [compressedLogo, setCompressedLogo] = useState(null)
    const [compressedFavicon, setCompressedFavicon] = useState(null)

    const [primaryColor, setPrimaryColor] = useState(config && config?.theme?.primary ? config?.theme?.primary : "#fbab7e")
    const [secondaryColor, setSecondaryColor] = useState(config && config?.theme?.secondary ? config?.theme?.secondary : "#f7ce68")
    const [lightColor, setLightColor] = useState(config && config?.theme?.light ? config?.theme?.light : "#F7FAFC")
    const [darkColor, setDarkColor] = useState(config && config?.theme?.dark ? config?.theme?.dark : "#1a202c")
    const [theme, setTheme] = useState(config && config.theme ? config.theme : "")
    const [themeInlineCss, setThemeInlineCss] = useState('')


    const handleChangeSiteKeys = (e) => {
        var value = e.target.value
        setSiteKeysText(value)

        var keysToArray = value.split(",")
        keysToArray = keysToArray.map(key => key.trim())
        setSiteKeys(keysToArray)
    }

    const handleChangeTheme = (e, theme) => {
        var value = e.value
        if (theme === 'primary') {
            setPrimaryColor(value)
        } else if (theme === 'secondary') {
            setSecondaryColor(value)
        } else if (theme === 'light') {
            setLightColor(value)
        } else if (theme === 'dark') {
            setDarkColor(value)
        }
    }

    const handleCompressedUpload = (e, type) => {
        const image = e.target.files[0];

        if (!image) return

        new Compressor(image, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64String = reader.result;
                    if (type === 'logo') {
                        setCompressedLogo(base64String)
                    } else if (type === 'favicon') {
                        setCompressedFavicon(base64String)
                    }
                };

                reader.onerror = (error) => {
                    console.error('Erro ao ler o arquivo:', error);
                };

                if (compressedResult) {
                    reader.readAsDataURL(compressedResult);
                }

            },
        });
    };

    const handleSave = async () => {
        const data = {
            site_name: siteName,
            site_description: siteDescription,
            site_keys: siteKeysText,
            copyright: copyright,
            logo: compressedLogo,
            favicon: compressedFavicon,
            custom_css: customCss,
            custom_javascript: customJavascript,
            social_networks: socialNetworks,
            theme: theme,
            pixel: pixel,
        }
        setIsLoading(true)
        const saveConfigResponse = await fetch('/api/configuration/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })

        setIsLoading(false)
        const json = await saveConfigResponse.json()
        if (json.ok) {
            toast({
                status: 'success',
                title: 'Configurações salvas com sucesso!'
            })
        } else {
            toast({
                status: 'error',
                title: json.message
            })
        }
    }

    useEffect(() => {
        var css = `
        .css-krpuct {
            background:linear-gradient(62deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${secondaryColor} 100%)!important;
        }
        .panel-topbar {
            background: ${lightColor}!important;color: ${darkColor}!important;}
        }
        #chakra-modal-:r3: {
            background: ${primaryColor}!important;}
        }
        .panel-topbar li:not(.active) {
            color: ${darkColor} !important;
        }
        .panel-topbar li.active {
            background: ${primaryColor}!important;
        }
        .panel-topbar li.active p {
            color: ${lightColor} !important;
        }
        .panel-topbar li.active svg {
            fill: ${lightColor} !important;
        }
        li:not(.active) svg {
            fill: ${darkColor} !important;
        }
        .css-1mclrct {
            background: ${primaryColor}!important;
        }
        .css-cfi26e {
            background: ${lightColor}!important;
        }
        .mobile-menu {
            background: ${lightColor}!important;
            color: ${darkColor}!important;
        }
        .chakra-form__label,
        input, 
        select, 
        textarea, 
        .chakra-text {
            color: ${darkColor}!important;
        }
        .chakra-button {
            background: ${primaryColor}!important;
            color: ${lightColor}!important;
        }
        `

        setThemeInlineCss(css)
        setTheme({
            primary: primaryColor,
            secondary: secondaryColor,
            light: lightColor,
            dark: darkColor
        })
    }, [primaryColor, secondaryColor, lightColor, darkColor])

    useEffect(() => {
        const socialNetworksData = {
            facebook: Facebook || null,
            instagram: Instagram || null,
            whatsapp: Whatsapp || null,
            youtube: Youtube || null,
            tiktok: Tiktok || null,
            kwai: Kwai || null
        }
        setSocialNetworks(socialNetworksData)
    }, [Facebook, Instagram, Whatsapp, Youtube, Tiktok, Kwai])


    return (
        <Main justifyContent="center" alignItems="center">
            <Head pageTitle="Configurações do site" config={config}>
                <style>
                    {themeInlineCss}
                </style>
            </Head>
            <Flex w="100%" h="100%" justifyContent="center" alignItems="center" flexDir="column" p={4}>
                <PanelTopbar config={config} />
                <chakra.form
                    w="100%"
                    h="100%"
                    alignItems="flex-start"
                    flexDir="column"
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    p={4}
                    mt={4}
                    minH={40}
                    overflowY="scroll"
                >
                    <FormControl>
                        <FormLabel>Nome do site</FormLabel>
                        <Input disabled={isLoading} onChange={(e) => setSiteName(e.target.value)} value={siteName} placeholder="Nome do site" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Descrição do site</FormLabel>
                        <Textarea disabled={isLoading} onChange={(e) => setSiteDescription(e.target.value)} value={siteDescription} placeholder="Descrição do site" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Palavras-chave</FormLabel>
                        <Input disabled={isLoading} onChange={handleChangeSiteKeys} value={siteKeysText} placeholder="Palavras-chave" />
                        <Flex flexWrap="wrap">
                            {siteKeys.map((key, index) => (
                                key &&
                                <Tag
                                    key={index}
                                    mt={1}
                                    size="sm"
                                    ml={index > 0 ? 1 : 0}
                                    variant='outline'
                                    color={`${config && config?.theme?.primary ? config.theme.primary : 'orange'}`}
                                    boxShadow={`inset 0 0 0px 1px ${config && config?.theme?.primary ? config.theme.primary : 'orange'}`}
                                >
                                    <TagLabel>{key}</TagLabel>
                                </Tag>
                            ))}
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Copyright</FormLabel>
                        <Input disabled={isLoading} onChange={(e) => setCopyright(e.target.value)} value={copyright} placeholder="Copyright do rodapé" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Pixel</FormLabel>
                        <Input disabled={isLoading} onChange={(e) => setPixel(e.target.value)} value={pixel} placeholder="Pixel do Facebook" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Logo</FormLabel>
                        <HStack opacity={isLoading ? 0.5 : 1}>
                            {compressedLogo ? (
                                <Img onClick={() => logoRef.current.click()} w="64px" objectFit="contain" src={compressedLogo} />
                            ) : (
                                <Img onClick={() => logoRef.current.click()} w="64px" objectFit="contain" src={`${siteLogo ? `${siteLogo}` : "https://via.placeholder.com/64"}`} />
                            )}
                            <Input ref={logoRef} onChange={(e) => handleCompressedUpload(e, 'logo')} display="none" type="file" accept="image/*" placeholder="Logo" />
                        </HStack>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Favicon</FormLabel>
                        <HStack opacity={isLoading ? 0.5 : 1}>
                            {compressedFavicon ? (
                                <Img onClick={() => faviconRef.current.click()} w="64px" objectFit="contain" src={compressedFavicon} />
                            ) : (
                                <Img onClick={() => faviconRef.current.click()} w="64px" objectFit="contain" src={`${siteFavicon ? `${siteFavicon}` : "https://via.placeholder.com/64"}`} />
                            )}
                            <Input ref={faviconRef} onChange={(e) => handleCompressedUpload(e, 'favicon')} display="none" type="file" accept="image/*" placeholder=" Favicon" />
                        </HStack>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Custom javascript</FormLabel>
                        <Box opacity={isLoading ? 0.5 : 1} w="100%" maxW="500px">
                            <CodeMirror
                                value={customJavascript}
                                onChange={e => setCustomJavascript(e)}
                                height="200px"
                                theme={darcula}
                                extensions={[javascript({ jsx: true })]}
                            />
                        </Box>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Custom CSS</FormLabel>
                        <Box opacity={isLoading ? 0.5 : 1} w="100%" maxW="500px">
                            <CodeMirror
                                value={customCss}
                                onChange={e => setCustomCss(e)}
                                height="200px"
                                theme={darcula}
                                extensions={[less()]}
                            />
                        </Box>
                    </FormControl>

                    <FormControl mt={4} w="100%">
                        <FormLabel>Tema</FormLabel>
                        <Flex w="200px" flexDir="column" opacity={isLoading ? 0.5 : 1}>
                            <Flex w="100%" alignItems="center" justifyContent="space-between">
                                <Text>Cor primaria</Text>
                                <Box
                                    w="32px"
                                    h="32px"
                                    bg={primaryColor}
                                    onClick={() => colorPrimaryRef.current.click()}
                                    borderRadius="full"
                                    ml={4}
                                    borderColor="blackAlpha.400"
                                    borderWidth={2}
                                />
                                <Input ref={colorPrimaryRef} display="none" type="color" value={primaryColor} onChange={(e) => handleChangeTheme(e.target, 'primary')} />
                            </Flex>

                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Text>Cor secundaria</Text>
                                <Box
                                    w="32px"
                                    h="32px"
                                    bg={secondaryColor}
                                    onClick={() => colorSecondaryRef.current.click()}
                                    borderRadius="full"
                                    ml={4}
                                    borderColor="blackAlpha.400"
                                    borderWidth={2}
                                />
                                <Input ref={colorSecondaryRef} display="none" type="color" value={secondaryColor} onChange={(e) => handleChangeTheme(e.target, 'secondary')} />
                            </Flex>

                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Text>Cor light</Text>
                                <Box
                                    w="32px"
                                    h="32px"
                                    bg={lightColor}
                                    onClick={() => colorLightRef.current.click()}
                                    borderRadius="full"
                                    ml={4}
                                    borderColor="blackAlpha.400"
                                    borderWidth={2}
                                />
                                <Input ref={colorLightRef} display="none" type="color" value={lightColor} onChange={(e) => handleChangeTheme(e.target, 'light')} />
                            </Flex>

                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Text>Cor dark</Text>
                                <Box
                                    w="32px"
                                    h="32px"
                                    bg={darkColor}
                                    onClick={() => colorDarkRef.current.click()}
                                    borderRadius="full"
                                    ml={4}
                                    borderColor="blackAlpha.400"
                                    borderWidth={2}
                                />
                                <Input ref={colorDarkRef} display="none" type="color" value={darkColor} onChange={(e) => handleChangeTheme(e.target, 'dark')} />
                            </Flex>
                        </Flex>
                        <FormHelperText color="red.500" cursor="pointer" onClick={() => {
                            setPrimaryColor("#fbab7e")
                            setSecondaryColor("#f7ce68")
                            setLightColor("#F7FAFC")
                            setDarkColor("#1a202c")
                        }}>Restaurar o padrão</FormHelperText>
                    </FormControl>

                    <FormControl mt={4} w="100%">
                        <FormLabel>Redes sociais</FormLabel>
                        <Flex maxW="500px" flexDir="column">
                            <Flex w="100%" alignItems="center" justifyContent="space-between">
                                <Img src="/images/social_networks/facebook.png" w="34px" mr={2} />
                                <Input disabled={isLoading} w="100%" type="text" value={Facebook} placeholder="Link da sua página no Facebook" onChange={(e) => setFacebook(e.target.value)} />
                            </Flex>
                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Img src="/images/social_networks/instagram.png" w="34px" mr={2} />
                                <Input disabled={isLoading} w="100%" type="text" value={Instagram} placeholder="Link da sua página no Instagram" onChange={(e) => setInstagram(e.target.value)} />
                            </Flex>
                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Img src="/images/social_networks/whatsapp.png" w="34px" mr={2} />
                                <Input disabled={isLoading} w="100%" type="text" value={Whatsapp} placeholder="Link do seu Whatsapp" onChange={(e) => setWhatsapp(e.target.value)} />
                            </Flex>
                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Img src="/images/social_networks/youtube.png" w="34px" mr={2} />
                                <Input disabled={isLoading} w="100%" type="text" value={Youtube} placeholder="Link do seu canal no Youtube" onChange={(e) => setYoutube(e.target.value)} />
                            </Flex>
                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Img src="/images/social_networks/tiktok.png" w="34px" mr={2} />
                                <Input disabled={isLoading} w="100%" type="text" value={Tiktok} placeholder="Link do seu TikTok" onChange={(e) => setTiktok(e.target.value)} />
                            </Flex>
                            <Flex w="100%" alignItems="center" justifyContent="space-between" mt={2}>
                                <Img src="/images/social_networks/kwai.png" w="34px" mr={2} />
                                <Input disabled={isLoading} w="100%" type="text" value={Kwai} placeholder="Link do Kwai" onChange={(e) => setKwai(e.target.value)} />
                            </Flex>
                        </Flex>

                    </FormControl>

                    <Flex>
                        <Button mt={4} onClick={handleSave} isLoading={isLoading} disabled={isLoading} colorScheme="green" w="100%">Salvar</Button>
                    </Flex>

                </chakra.form>
            </Flex>
        </Main>
    )
}

export async function getServerSideProps({ req, res }) {
    const token = getCookie("token", { req, res })

    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login"
            }
        }
    }

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/auth/verify_token`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        const json = await response.json()
        if (json.ok) {
            const getConfig = await fetch(`${process.env.BASE_URL}/api/configuration/get`)
            const configJson = await getConfig.json()
            return {
                props: {
                    config: configJson.data
                }
            }
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/login"
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login"
            }
        }
    }

}