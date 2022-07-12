import UsersDAO from '../services/UsersDAO.js'
import { hashPassword } from '../utils/crypto.js'
import { parseBasicAuth } from '../utils/parsers.js'
import { db } from '../services/database.js'

const usersDAO = new UsersDAO(db)

export default async (req, res, next) => {
    const { username, password } = parseBasicAuth(req.headers.authorization)

    const user = await usersDAO.findUserByUsername(username)
    if (username !== user?.username)
        return res.status(404).send('User does not exist!')
    const { hash } = hashPassword(password, user.salt)
    if (hash !== user?.password) return res.status(401).send('Wrong password!')

    res.locals.username = username

    return next()
}
