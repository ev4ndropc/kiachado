import Auth from "../../../../utils/Auth"
import database from '../../../../database'

export default async function listProducts(request, response) {
    const isValid = Auth(request, response)
    if(!isValid.ok)
    return response.status(400).json({ ok: false })

    try {
        const { limit = 20, offset = 0 } = request.query
        
        const products = await database.select('*').from('products').limit(limit).offset(offset)
    
        return response.status(200).json({ ok: true, data: products })
        
    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}