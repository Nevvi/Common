'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        super(baseUrl, clientId, clientSecret, scopes)
    }

    async createUser(user) {
        const response = await this.invokePost(`/api/v1/users`, user)
        return response.data
    }
}