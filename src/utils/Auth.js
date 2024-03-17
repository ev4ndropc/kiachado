const jwt = require('jsonwebtoken')

module.exports = (request, response) => {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader)
      return response.status(401).json({ error: true, message: 'No token provided!', notallowed: true })

    const parts = authHeader.split(' ')

    if (!parts.length === 2)
      return response.status(401).json({ error: true, message: 'Token error!', notallowed: true })

    const [scheme, token] = parts

    if (!scheme === 'Bearer')
      return response.status(401).json({ error: true, message: 'Token malformatted!', notallowed: true })

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return response.status(401).json({ error: true, messsage: 'Token invalid!', notallowed: true })

      request._id = decoded._id
      request.email = decoded.email
    })

    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }

}