'use strict';

const { Model } = require('objection');

class Favorite extends Model {
    static get tableName() {
        return 'favorites';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userId', 'movieId'],
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                movieId: { type: 'integer' }
            }
        };
    }
}

module.exports = Favorite;