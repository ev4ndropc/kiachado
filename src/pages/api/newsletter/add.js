
import moment from "moment/moment"
import 'moment/locale/pt-br'

const database = require("../../../database")

export default async function NewsletterAdd(request, response) {
    const { whatsapp } = request.body

    if (!whatsapp || whatsapp.trim() == '') return response.status(400).json({ ok: false, message: 'Por favor, informe um número de whatsapp válido!' })


    try {
        const hasWhatsapp = await database.select('*').table('newsletter').where({ whatsapp }).first()

        if (!hasWhatsapp) {
            await database.insert({
                whatsapp,
                created_at: moment().format()
            }).table('newsletter')
        }

        return response.status(200).json({ ok: true })

    } catch (error) {
        console.log(error)
        return response.status(200).json({ ok: false })
    }
}