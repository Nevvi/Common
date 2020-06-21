'use strict'

const jwtDecode = require('jwt-decode')

const {AuthPolicy} = require('./AuthPolicy')
const {TokenNotFoundError} = require('./Errors')

module.exports = class {
    constructor() {
    }

    async authorize(event) {
        let token

        try {
            const authToken = event.headers.Authorization || event.headers.authorization
            if (!authToken) throw new TokenNotFoundError()

            token = jwtDecode(authToken)
        } catch (e) {
            throw new Error('Unauthorized')
        }

        // Generate the permissions/methods allowed to be accessed
        const policy = this.buildPolicy(token, event.methodArn)
        const userId = token['cognito:username']
        this.generatePermissions(policy, userId)

        // finally, build the policy
        const authResponse = policy.build();

        // TODO - add context to the request that we parsed from token
        authResponse.context = {}

        return authResponse
    }

    buildPolicy(token, methodArn) {
        const sub = token['sub']

        // set the unique principal to be the sub of the caller
        const principalId = `user|${sub}`

        // build apiOptions for the AuthPolicy
        const apiOptions = {};
        const tmp = methodArn.split(':');
        const apiGatewayArnTmp = tmp[5].split('/');
        const awsAccountId = tmp[4];
        apiOptions.region = tmp[3];
        apiOptions.restApiId = apiGatewayArnTmp[0];
        apiOptions.stage = apiGatewayArnTmp[1];

        return new AuthPolicy(principalId, awsAccountId, apiOptions);
    }

    // Override this for custom behavior
    generatePermissions(authPolicy, userId) {
        authPolicy.denyAllMethods();
    }
}