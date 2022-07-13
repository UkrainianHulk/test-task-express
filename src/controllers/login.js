import { env } from 'process'
import UsersDAO from '../services/UsersDAO.js'
import { db } from '../services/database.js'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = env
const usersDAO = new UsersDAO(db)

export default async function (req, res, next) {
    try {
        const { username } = res.locals
        const user = await usersDAO.findUserByUsername(username)

        const token = jwt.sign({ username, role: user.role }, JWT_SECRET, {
            expiresIn: '1d'
        })

        res.send(token)
    } catch (error) {
        next(error)
    }
}
