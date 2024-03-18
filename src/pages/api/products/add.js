import moment from 'moment'
import 'moment/locale/pt-br'
import NextCors from 'nextjs-cors';


const Auth = require("../../../utils/Auth")
const database = require("../../../database")

export default async function addProducts(request, response) {
    await NextCors(request, response, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const isValid = Auth(request, response)
    if (!isValid.ok)
        return response.status(400).json({ ok: false })


    try {
        const { name, image, rating, platform, link, reviews } = request.body

        if (!name || !image || !rating || !platform || !link)
            return response.status(400).json({ ok: false, message: 'Erro ao cadastrar o produto, verifique as informações enviadas' })

        const product = await database.insert({
            name,
            image,
            rating,
            platform,
            link,
            created_at: moment().format()
        }).into('products').returning('*')

        function formatDate(date) {
            const meses = {
                janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
                julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
            };

            const partesData = dataString.split(' ');
            const dia = parseInt(partesData[0], 10);
            const mes = meses[partesData[2].toLowerCase()];
            const ano = parseInt(partesData[4], 10);

            const data = new Date(ano, mes, dia);

            return data;
        }

        if (reviews) {
            var data = reviews.map(review => ({
                product_id: product[0].id,
                review_rating: review.review_rating,
                review_text: review.review_text,
                review_profile_avatar: review.review_profile_avatar,
                review_profile_name: review.review_profile_name,
                created_at: platform == 'amazon' ? moment(formatDate(review.review_date)).format() : moment(review.review_date).format()
            }))
            await database.insert(data).into('reviews').returning('*')
        }

        return response.status(200).json({ ok: true, data: 'Produto adicionado com sucesso!' })

    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}