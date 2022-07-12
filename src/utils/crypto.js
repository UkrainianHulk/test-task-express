import { pbkdf2Sync, randomBytes } from 'crypto'

export function hashPassword(password, salt) {
    if (!salt) salt = randomBytes(256).toString('hex')
    const hash = pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString(
        'hex'
    )
    return { hash, salt }
}
