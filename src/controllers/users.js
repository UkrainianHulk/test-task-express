import { db } from '../services/database.js'
import UsersDAO from '../services/UsersDAO.js'
import log from '../utils/log.js'

const usersDAO = new UsersDAO(db)

export default async function (req, res, next) {
    try {
        const { username, role } = res.locals

        if (role === 'user') {
            const user = await usersDAO.findUserByUsername(username)
            return res.send(user)
        }

        if (role === 'admin') {
            const users = await usersDAO.findUsers()
            return res.send(users)
        }

        if (role === 'boss') {
            const user = await usersDAO.findUserByUsername(username)
            const subordinates = await usersDAO.findSubordinates(user._id)
            return res.send(subordinates)
        }

        throw new Error('Unknown user role')
    } catch (error) {
        log.error(error)
    }
}
