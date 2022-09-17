import moment from 'moment'
import 'moment/locale/pt-br'

import Auth from "../../../../utils/Auth"
import database from '../../../../database'

export default async function addProducts(request, response) {
    const isValid = Auth(request, response)
    if(!isValid.ok)
    return response.status(400).json({ ok: false })

    
    try {
        const { id } = request.query

        if(!id)
        return response.status(400).json({ ok: false, message: 'Erro ao deletar o produto, verifique as informações enviadas' })
    
        await database.delete().where({ id }).table('products')
        
        return response.status(200).json({ ok: true, data: 'Produto deletado com sucesso!' })
        
    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}