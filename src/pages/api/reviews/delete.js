import database from '../../../database'

export default async function deleteReview(request, response) {
    const { review_id } = request.query

    try {
        await database.delete().where({ id: review_id }).table('reviews')

        return response.status(200).json({ ok: true, data: 'Avaliação deletada com sucesso!' })

    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}