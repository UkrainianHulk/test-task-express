import log from '../utils/log.js'

export default function (error, req, res, next) {
    log.error(error.stack)
    res.send(error.message)
}
