import Head from "next/head";
import { useEffect } from "react";

export default function Header({ pageTitle, children, config }) {
    useEffect(() => {
        if (config && config?.custom_javascript) {
            const script = document.createElement("script");
            script.innerHTML = config?.custom_javascript;
            document.body.appendChild(script);
        }
    }, [])
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/x-icon" href={config && config?.favicon ? `${config?.favicon}` : '/images/icon.png'} />
            <meta name="description" content={config && config?.site_description ? config?.site_description : ''} />
            <meta name="keywords" content={config && config?.site_keys ? config?.site_keys : ''} />
            <title>{pageTitle ? `${pageTitle} - ${config && config?.site_name ? config?.site_name : ''} ` : config && config?.site_name ? config?.site_name : ''}</title>
            <style>
                {`
                    :root {
                     --primary: ${config && config?.theme?.primary};
                     --secondary: ${config && config?.theme?.secondary};
                     --light: ${config && config?.theme?.light};
                     --dark: ${config && config?.theme?.dark};   
                    }
                    .css-krpuct,
                    .css-rq199c,
                    .css-1v5z1kv{
                        background:linear-gradient(62deg, ${config && config?.theme?.primary} 0%, ${config && config?.theme?.secondary} 50%, ${config && config?.theme?.secondary} 100%)!important;
                    }
                    .chakra-form__label,
                    input, 
                    select, 
                    textarea, 
                    .chakra-text {
                        color: ${config && config?.theme?.dark}!important;
                    }
                    .panel-topbar {
                        background: ${config && config?.theme?.light}!important;
                        color: ${config && config?.theme?.dark}!important;}
                    }
                    #chakra-modal-:r3: {
                        background: ${config && config?.theme?.primary}!important;}
                    }
                    .panel-topbar li:not(.active),
                    .chakra-heading,
                    p.chakra-text {
                        color: ${config && config?.theme?.dark} !important;
                    }
                    .panel-topbar li.active p {
                        color: ${config && config?.theme?.light} !important;
                    }
                    .panel-topbar li.active {
                        background: ${config && config?.theme?.primary}!important;
                    }
                    .panel-topbar li.active svg {
                        fill: ${config && config?.theme?.light} !important;
                    }
                    li:not(.active) svg {
                        fill: ${config && config?.theme?.dark} !important;
                    }
                    .mobile-menu li.active {
                        background: ${config && config?.theme?.primary}!important;
                        color: ${config && config?.theme?.light}!important;
                    }
                    .mobile-menu li.active p {
                        background: ${config && config?.theme?.primary}!important;
                        color: ${config && config?.theme?.light}!important;
                    }
                    a.chakra-link:not(.chakra-stack *),
                    a.chakra-link.chakra-button.btn {
                        background: ${config && config?.theme?.primary}!important;
                        color: ${config && config?.theme?.light}!important;
                    }
                    button.chakra-button:not(.edit-button):not(.delete-button) {
                        background: ${config && config?.theme?.primary}!important;
                        color: ${config && config?.theme?.light}!important;
                    }
                    .search-product input {
                        border-color: ${config && config?.theme?.primary}!important;
                    }
                    .css-3yzcwe,
                    input:focus-visible, 
                    input[data-focus-visible] {
                        border-color: ${config && config?.theme?.primary}!important;
                        box-shadow: 0 0 0 1px ${config && config?.theme?.primary} !important;
                    }
                    button.chakra-button svg {
                        fill: ${config && config?.theme?.light}!important;
                    }
                    .copyright,
                    .footer_col .chakra-text {
                        color: ${config && config?.theme?.light}!important;   
                    }
                    .css-cfi26e,
                    .css-7i64dd {
                        background: ${config && config?.theme?.light}!important;
                    }
                    .mobile-menu {
                        background: ${config && config?.theme?.light}!important;
                        color: ${config && config?.theme?.dark}!important;
                    }

                    `}
            </style>
            <style>
                {config && config?.custom_css ? config?.custom_css : ''}
            </style>
            {children}

        </Head>
    )
}