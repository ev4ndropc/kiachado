import database from '../../../database'
import Auth from "../../../utils/Auth"

export default async function deleteReview(request, response) {
    const isValid = Auth(request, response)
    if (!isValid.ok)
        return response.status(400).json({ ok: false, message: 'Erro ao deletar a avaliação, verifique as informações enviadas' })


    const { review_id } = request.query

    if (!review_id)
        return response.status(400).json({ ok: false, message: 'Erro ao deletar a avaliação, verifique as informações enviadas' })


    try {
        await database.delete().where({ id: review_id }).table('reviews')

        return response.status(200).json({ ok: true, data: 'Avaliação deletada com sucesso!' })

    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}