import jwt from 'jsonwebtoken'

function generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: 1000*60*60*24*30,
    })
}


export default function Login(request, response) {
    const { email, password } = request.body;

    if(!email || !password)
       return response.status(400).send({ ok: false, message: 'Endereço de email ou senha inválido.' });

    if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD)
        return response.status(400).send({ ok: false, message: 'Endereço de email ou senha inválido.' });

    return response.status(200).json({ ok: true, message: 'Logado com sucesso!', token: generateToken({
        email: email,
    }) })
}
