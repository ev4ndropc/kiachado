import Auth from "../../../utils/Auth"
import database from '../../../database'

export default async function listProducts(request, response) {
    const { product_id } = request.query

    try {
        const reviews = await database.select('*').from('reviews').where('product_id', product_id)

        if (reviews.length === 0)
            return response.status(200).json({ ok: true, data: [] })

        return response.status(200).json({ ok: true, data: reviews })

    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}