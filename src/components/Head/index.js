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
            <link rel="icon" type="image/x-icon" href={config && config?.favicon ? `/images/${config?.favicon}` : '/images/icon.png'} />
            <meta name="description" content={config && config?.site_description ? config?.site_description : ''} />
            <meta name="keywords" content={config && config?.site_keys ? config?.site_keys : ''} />
            <title>{pageTitle ? `${pageTitle} - ${config && config?.site_name ? config?.site_name : ''} ` : config && config?.site_name ? config?.site_name : ''}</title>
            <style>
                {`
                    .css-krpuct,
                    .css-rq199c {
                        background:linear-gradient(62deg, ${config && config?.theme?.primary} 0%, ${config && config?.theme?.secondary} 50%, ${config && config?.theme?.secondary} 100%)!important;
                    }
                    .panel-topbar {
                        background: ${config && config?.theme?.light}!important;color: ${config && config?.theme?.dark}!important;}
                    }
                    #chakra-modal-:r3: {
                        background: ${config && config?.theme?.primary}!important;}
                    }
                    .panel-topbar li:not(.active) {
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
                    .css-1mclrct {
                        background: ${config && config?.theme?.primary}!important;
                    }
                    .css-cfi26e {
                        background: ${config && config?.theme?.light}!important;
                    }
                    .mobile-menu {
                        background: ${config && config?.theme?.light}!important;
                        color: ${config && config?.theme?.dark}!important;
                    }
                    .chakra-form__label,
                    input, 
                    select, 
                    textarea, 
                    .chakra-text {
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