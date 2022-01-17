'use strict'

const HttpClient = require('../HttpClient')

module.exports = class extends HttpClient {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        super(baseUrl, clientId, clientSecret, scopes)
    }

    async getUserByPhoneNumber(phoneNumber) {
        const response = await this.invokeGet(`/api/v1/users?phoneNumber=${encodeURIComponent(phoneNumber)}`)
        return response.data
    }
}