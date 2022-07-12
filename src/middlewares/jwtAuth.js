import { env } from 'process'
import { parseBearerToken } from '../utils/parsers.js'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = env

export default async (req, res, next) => {
    try {
        const token = parseBearerToken(req.headers.authorization)
        const { username, role } = jwt.verify(token, JWT_SECRET)
        res.locals = { username, role }
        next()
    } catch (error) {
        res.status(401).send(error.message)
    }
}
