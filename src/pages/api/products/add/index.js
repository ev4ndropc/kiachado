import moment from 'moment'
import 'moment/locale/pt-br'

import Auth from "../../../../utils/Auth"
import database from '../../../../database'

export default async function addProducts(request, response) {
    const isValid = Auth(request, response)
    if (!isValid.ok)
        return response.status(400).json({ ok: false })


    try {
        const { name, image, rating, platform, link } = request.body

        if (!name || !image || !rating || !platform || !link)
            return response.status(400).json({ ok: false, message: 'Erro ao cadastrar o produto, verifique as informações enviadas' })

        await database.insert({
            name,
            image,
            rating,
            platform,
            link,
            created_at: moment().format()
        }).into('products')

        return response.status(200).json({ ok: true, data: 'Produto adicionado com sucesso!' })

    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}