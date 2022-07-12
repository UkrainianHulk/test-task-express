export default class {
    constructor(db) {
        this.#db = db
    }

    #db

    async addUser(userData) {
        const timestamp = Date.now()
        return this.#db.collection('users').insertOne({
            ...userData,
            created_at: timestamp,
            updated_at: timestamp
        })
    }

    async updateUser(query, userData) {
        return this.#db.collection('users').updateOne(query, {
            $set: {
                ...userData,
                updated_at: Date.now()
            }
        })
    }

    async findUsers(query, options) {
        return this.#db.collection('users').find(query, options).toArray()
    }

    async findUserByUsername(username) {
        return this.#db.collection('users').findOne({ username })
    }

    async findSubordinates(userObjectId) {
        return this.#db
            .collection('users')
            .aggregate([
                {
                    $match: { _id: userObjectId }
                },
                {
                    $graphLookup: {
                        from: 'users',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'boss',
                        as: 'subordinates'
                    }
                }
            ])
            .toArray()
    }

    async deleteUser(query) {
        return this.#db.collection('users').deleteOne(query)
    }
}
