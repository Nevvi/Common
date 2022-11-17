'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        super(baseUrl, clientId, clientSecret, scopes)
    }

    async updateUser(userId, phoneNumber) {
        const response = await this.invokePatch(`/api/v1/users/${userId}`, {phoneNumber})
        return response.data
    }
}