import moment from 'moment'
import 'moment/locale/pt-br'

const Auth = require("../../../../utils/Auth")
const database = require("../../../../database")

export default async function addProducts(request, response) {
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

        if (reviews) {
            var data = reviews.map(review => ({
                product_id: product[0].id,
                review_rating: review.review_rating,
                review_text: review.review_text,
                review_profile_avatar: review.review_profile_avatar,
                review_profile_name: review.review_profile_name,
                created_at: moment().format()
            }))
            await database.insert(data).into('reviews').returning('*')
        }

        return response.status(200).json({ ok: true, data: 'Produto adicionado com sucesso!' })

    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}