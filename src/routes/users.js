import { Router } from 'express'
import users from '../controllers/users.js'
import jwtAuth from '../middlewares/jwtAuth.js'

const router = new Router()

router.get('/', jwtAuth, users)

export default router
