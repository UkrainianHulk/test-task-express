import { db } from '../services/database.js'
import UsersDAO from '../services/UsersDAO.js'
import { hashPassword } from '../utils/crypto.js'

const usersDAO = new UsersDAO(db)

export default async function (req, res, next) {
    try {
        const userFilds = [
            'username',
            'password',
            'role',
            'boss',
            'firstName',
            'lastName'
        ]
        const user = userFilds.reduce((acc, field) => {
            if (req.body[field] === undefined) return acc
            else return { [field]: req.body[field], ...acc }
        }, {})

        if (user.role !== 'admin') {
            if (!user.boss) throw new Error('You must specify your boss!')
            const boss = await usersDAO.findUserByUsername(user.boss)
            if (!boss) throw new Error('Boss you specified does not exist!')
            if (!/boss|admin/.test(boss.role))
                throw new Error('User you specified is not boss!')
            user.boss = boss._id
        }

        const { hash, salt } = hashPassword(user.password)
        user.password = hash
        user.salt = salt

        await usersDAO.addUser(user)
        res.status(201).send('User added!')
    } catch (error) {
        next(error)
    }
}
