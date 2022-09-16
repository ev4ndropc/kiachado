import Head from "next/head";

export default function Header (props) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/x-icon" href="/images/icon.png"/>
            <meta name="description" content="Encontre os produtos legais e úteis."/>
            <meta name="keywords" content="produtos mais legais, invenções mais legais, produtos inovadores, idéias de invenções, invenções do Japão, gadgets, gadgets legais para comprar, gadgets legais para comprar hoje."/>
            <title>{props?.pageTitle ? `${props.pageTitle} - Ki Achado ` : 'Os melhores achados da internet - Ki Achado '}</title>
        </Head>
    )
}