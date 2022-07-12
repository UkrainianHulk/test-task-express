import { Router, json } from 'express'
import basicAuth from '../middlewares/basicAuth.js'
import login from '../controllers/login.js'

const router = new Router()
router.use(json())

router.get('/', basicAuth, login)

export default router
