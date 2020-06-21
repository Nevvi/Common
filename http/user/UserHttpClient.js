'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        super(baseUrl, clientId, clientSecret, scopes)
    }

    async createUser(user) {
        await this.invokePost('/v1/users', user)
    }
}