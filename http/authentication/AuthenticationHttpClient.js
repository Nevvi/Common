'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        super(baseUrl, clientId, clientSecret, scopes)
    }

    async updateUser(userId, email) {
        const response = await this.invokePatch(`/api/v1/users/${userId}`, {email})
        return response.data
    }
}