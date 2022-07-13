import { Router, json } from 'express'
import { body } from 'express-validator'
import validationResultHandler from '../middlewares/validationResultHandler.js'
import registration from '../controllers/registration.js'

const router = new Router()
router.use(json())

const registrationValidators = [
    body('username')
        .isAlpha('en-US', { ignore: /[0-9]+/ })
        .withMessage('Only en letters and numbers')
        .isLength({ min: 5, max: 12 })
        .withMessage('Username must be 5-12 symbols length'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Minimum password length is 8'),
    body('role').isIn(['user', 'boss', 'admin']),
    body('boss').optional().isString(),
    body('subordinates.*').isString(),
    body('firstName').optional().isAlpha(),
    body('lastName').optional().isAlpha()
]

router.post('/', registrationValidators, validationResultHandler, registration)

export default router
