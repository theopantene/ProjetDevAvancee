'use strict';

const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['firstName', 'lastName', 'password', 'mail', 'username', 'role'],
            properties: {
                id: { type: 'integer' },
                firstName: { type: 'string', minLength: 3 },
                lastName: { type: 'string', minLength: 3 },
                password: { type: 'string', minLength: 8 },
                mail: { type: 'string', format: 'email' },
                username: { type: 'string' },
                role: { type: 'string', enum: ['user', 'admin'], default: 'user' }
            }
        };
    }

    static get jsonAttributes() {
        return ['scope'];
    }

    $beforeInsert() {
        this.role = this.role || 'user';
    }
}

module.exports = User;