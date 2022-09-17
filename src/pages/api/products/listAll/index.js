import database from '../../../../database'

export default async function findProducts(request, response) {

    try {

        const product = await database.select(["id", "affiliateLink", "image", "name", "rating", "platform"]).from("products").orderBy('createdAt', 'desc')
        return response.status(200).json({ ok: true, data: product })


    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}