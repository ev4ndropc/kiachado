const database = require('../../../database')

export default async function GetConfiguration(request, response) {

    try {
        const configuration = await database.select('*').from('configuration').first()
        if (!configuration)
            return response.status(200).json({ ok: true, data: {} })

        return response.status(200).json({ ok: true, data: configuration })

    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}