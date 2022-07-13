import { db } from '../services/database.js'
import UsersDAO from '../services/UsersDAO.js'
import { isBoss } from '../utils/roles.js'

const usersDAO = new UsersDAO(db)

export async function getUsers(req, res, next) {
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
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req, res, next) {
    try {
        const { username, role } = res.locals
        const isUserBoss = isBoss(role)
        if (!isUserBoss) return res.status(403).send('You have to be a boss!')

        const user = await usersDAO.findUserByUsername(username)
        const requestedUsername = req.params.username
        const requestedUser = await usersDAO.findUserByUsername(
            requestedUsername
        )

        if (!requestedUser.boss.equals(user._id))
            return res
                .status(403)
                .send(`You have to be a boss of the ${requestedUsername}!`)

        const newBoss = await usersDAO.findUserByUsername(req.body.boss)
        if (!newBoss) throw new Error('Boss you specified does not exist!')
        const isNewBossBoss = isBoss(newBoss.role)

        if (!isNewBossBoss)
            return res.status(400).send(`${newBoss.username} is not a boss!`)

        await usersDAO.updateUser(
            { username: requestedUsername },
            { boss: newBoss._id }
        )

        res.send('User updated!')
    } catch (error) {
        next(error)
    }
}
