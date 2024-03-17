import moment from 'moment'
import 'moment/locale/pt-br'

import Auth from "../../../utils/Auth"
import database from '../../../database'

export default async function editProducts(request, response) {
    const isValid = Auth(request, response)
    if (!isValid.ok)
        return response.status(400).json({ ok: false })


    try {
        const { id, name, link, affiliateLink, rating } = request.body
        if (!id)
            return response.status(400).json({ ok: false, message: 'Erro ao editar o produto, verifique as informações enviadas' })

        await database.update({
            name,
            link,
            rating,
            affiliateLink,
        }).where({ id }).table('products')

        return response.status(200).json({ ok: true, data: 'Produto editado com sucesso!' })

    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}