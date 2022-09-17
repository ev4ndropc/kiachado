import jwt from 'jsonwebtoken'
import database from '../../../database'
import bcrypt from 'bcrypt'

function generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: 1000*60*60*24*30,
    })
}

export default async function Login(request, response) {
    const { email, password } = request.body;


    if(!email || !password)
    return response.status(400).send({ ok: false, message: 'Endereço de email ou senha inválido.' });

    const user = await database.select('*').where({ email }).table('users').first()
    const correct = bcrypt.compareSync(password, user.password);

    if (!correct)
    return response.status(400).send({ ok: false, message: 'Endereço de email ou senha inválido.' });

    return response.status(200).json({ ok: true, message: 'Logado com sucesso!', token: generateToken({
        email: email,
    }) })
}
