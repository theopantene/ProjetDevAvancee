'use strict';

const { Model } = require('objection');

class Movie extends Model {
    static get tableName() {
        return 'movies';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'description', 'releaseDate', 'director'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: 'string' },
                releaseDate: { type: 'string', format: 'date' },
                director: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        };
    }

    $beforeInsert() {
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = Movie;