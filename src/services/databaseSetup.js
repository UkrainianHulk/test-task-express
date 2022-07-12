export default async (db) => {
    const usersCollection = db.collection('users')

    await usersCollection.createIndex({ username: 1 }, { unique: true })
}
