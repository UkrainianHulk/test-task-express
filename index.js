import 'dotenv/config'
import { env } from 'process'
import express from 'express'
import log from './src/utils/log.js'
import registrationRouter from './src/routes/registration.js'
import loginRouter from './src/routes/login.js'
import usersRouter from './src/routes/users.js'
import errorHandler from './src/controllers/errorHandler.js'
import { db, client as dbClient } from './src/services/database.js'
import setupDatabase from './src/services/databaseSetup.js'

await dbClient.connect()
await setupDatabase(db)

const { APP_PORT = 3000 } = env
const app = express()

app.use('/registration', registrationRouter)
app.use('/login', loginRouter)
app.use('/users', usersRouter)
app.use(errorHandler)

app.listen(APP_PORT, () => {
    log.info(`App running on port ${APP_PORT}`)
})

process.on('SIGINT', () => {
    app.close()
    db.close()
})
