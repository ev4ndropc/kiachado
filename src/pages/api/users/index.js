import Auth from "../../../utils/Auth"

export default function Login(request, response) {
    try {
        const isValid = Auth(request, response)

        if (!isValid.ok)
            return response.status(400).json({ ok: false })


        return response.status(200).json({ ok: true })
    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false })

    }

}