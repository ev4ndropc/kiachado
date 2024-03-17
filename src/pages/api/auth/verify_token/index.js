const Auth = require('../../../../utils/Auth')

export default function Login(request, response) {
    const isValid = Auth(request, response)
    if (!isValid.ok)
        return response.status(400).json({ ok: false })

    return response.status(200).json({ ok: true })
}