'use strict'

const axios = require('axios')

module.exports = class {
    constructor(baseUrl, clientId, clientSecret, scopes) {
        this.baseUrl = baseUrl
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.scopes = scopes
    }

    async invokeGet(url) {
        const token = await this.getApiToken()
        const headers = {Authorization: token}
        const fullUrl = `${this.baseUrl}${url}`
        console.log(`Making GET call to ${fullUrl}`)
        return await axios.get(fullUrl, {headers})
    }

    async invokePost(url, body) {
        const token = await this.getApiToken()
        const headers = {Authorization: token}
        const fullUrl = `${this.baseUrl}${url}`
        console.log(`Making POST call to ${fullUrl}`)
        return await axios.post(fullUrl, body, {headers})
    }

    async getApiToken() {
        const basicAuth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
        const contentType = 'application/x-www-form-urlencoded'
        const grantType = 'client_credentials'
        const oauthUrl = process.env.OAUTH_DOMAIN_URL
        const scopes = this.scopes.split(',').join(' ')

        const config = {
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': contentType
            }
        }

        const url = `${oauthUrl}?grant_type=${grantType}&client_id=${this.clientId}&scope=${scopes}`

        const response = await axios.post(url, null, config)
        return response.data && response.data.access_token
    }
}