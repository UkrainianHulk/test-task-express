export function parseBasicAuth(authHeader) {
    const b64auth = (authHeader || '').split(' ')[1] || ''
    const authstr = Buffer.from(b64auth, 'base64').toString()
    const splitIndex = authstr.indexOf(':')
    const username = authstr.substring(0, splitIndex)
    const password = authstr.substring(splitIndex + 1)

    return { username, password }
}

export function parseBearerToken(authHeader) {
    const token = (authHeader || '').split(' ')[1] || ''

    return token
}
