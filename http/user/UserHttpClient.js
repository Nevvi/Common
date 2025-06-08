'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, apiKey) {
        super(baseUrl, apiKey)
    }

    async createUser(user) {
        const response = await this.invokePost(`/api/v1/users`, user)
        return response.data
    }

    async updateUserContact(userId, contact) {
        await this.invokePost(`/api/v1/users/${userId}/contact`, contact)
    }
}