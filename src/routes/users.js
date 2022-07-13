import { Router, json } from 'express'
import { getUsers, updateUser } from '../controllers/users.js'
import jwtAuth from '../middlewares/jwtAuth.js'
import { body } from 'express-validator'
import validationResultHandler from '../middlewares/validationResultHandler.js'

const router = new Router()
router.use(json())

const updateUserValidators = [body('boss').isString()]

router.get('/', jwtAuth, getUsers)
router.post(
    '/:username',
    jwtAuth,
    updateUserValidators,
    validationResultHandler,
    updateUser
)

export default router
