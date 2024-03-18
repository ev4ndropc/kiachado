import database from '../../../database'

export default async function findProducts(request, response) {

    try {
        const products = await database
            .select('products.id', 'products.affiliateLink', 'products.image', 'products.name', 'products.rating', 'products.platform', database.raw('json_agg(reviews) AS reviews'))
            .from('products')
            .leftJoin('reviews', 'products.id', 'reviews.product_id')
            .groupBy('products.id')
            .orderBy('products.id', 'desc')

        return response.status(200).json({ ok: true, data: products })
    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}