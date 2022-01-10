'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        super(baseUrl, clientId, clientSecret, scopes)
    }

    async createUser(user) {
        await this.invokePost('/api/v1/users', user)
    }

    async updateUserContact(userId, contact) {
        await this.invokePost(`/api/v1/users/${userId}/contact`, contact)
    }
}