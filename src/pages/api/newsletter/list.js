
import moment from "moment/moment"
import 'moment/locale/pt-br'

const database = require("../../../database")
const Auth = require('../../../utils/Auth');

export default async function NewsletterList(request, response) {
    const isValid = Auth(request, response);

    if (!isValid.ok)
        return response.status(400).json({ ok: false });



    try {
        const users = await database.select('*').table('newsletter').orderBy('created_at', 'desc')

        return response.status(200).json({ ok: true, data: users })

    } catch (error) {
        console.log(error)
        return response.status(200).json({ ok: false, message: error.message })
    }
}