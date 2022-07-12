import { env } from 'process'
import { MongoClient } from 'mongodb'

const { DB_URI, DB_NAME } = env

const client = new MongoClient(DB_URI)
const db = client.db(DB_NAME)

export { client, db }
