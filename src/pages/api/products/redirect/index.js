import database from '../../../../database'

export default async function findProducts(request, response) {
    const { id } = request.query

    try {
        if (!id)
            return response.status(400).json({ ok: false, message: 'ID de produto não encontrado!' })

        const product = await database.increment('clicks').where({ id }).table('products').then(async id => {
            return await database.select(["id", "affiliateLink"]).where({ id }).table('products').first()
        })

        return response.status(200).json({ ok: true, data: product })


    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}