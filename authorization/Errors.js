'use strict'

module.exports.TokenNotFoundError = class extends Error {
    constructor() {
        super('Authorization token not found');
    }
}