const database = require("../../../database")

export default async function Newsletter(request, response) {
    const { id } = request.query

    if (!id)
        return response.status(400).json({ ok: false, message: 'ID de usuário não encontrado!' })

    try {
        await database.delete().where({ id }).table('newsletter')
        return response.status(200).json({ ok: true, data: 'Usuário deletado com sucesso!' })
    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}