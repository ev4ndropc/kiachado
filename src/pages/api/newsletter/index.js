
import moment from "moment/moment"
import 'moment/locale/pt-br'

import database from "../../../database"

export default async function Newsletter(request, response) {
    const { email } = request.body

    if(!email || email.trim() == '') return response.status(400).json({ ok: false, message: 'Por favor, informe um e-mail válido!' })

    if(!email.includes('@')) return response.status(400).json({ ok: false, message: 'Por favor, informe um e-mail válido!' })

    try {
        const hasEmail = await database.select('*').table('newsletter').where({ email }).first()

        if(!hasEmail) {
            await database.insert({
                email,
                createdAt: moment().format()
            }).table('newsletter')
        }
    
        return response.status(200).json({ ok: true })
        
    } catch (error) { 
        console.log(error)
        return response.status(200).json({ ok: false })
    }
}