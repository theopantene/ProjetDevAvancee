'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

module.exports = {
    name: 'app-swagger',
    async register(server) {

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    info: {
                        version: Package.version
                    },
                    tags: [
                        { name: 'user', description: 'User related endpoints' },
                        { name: 'movie', description: 'Movie related endpoints' },
                        { name: 'favorite', description: 'Favorite related endpoints' },
                        { name: 'export', description: 'Export related endpoints' }
                    ],
                    definitions: {
                        Movie: {
                            type: 'object',
                            properties: {
                                title: { type: 'string', description: 'Title of the movie' },
                                description: { type: 'string', description: 'Description of the movie' },
                                releaseDate: { type: 'string', format: 'date', description: 'Release date of the movie' },
                                director: { type: 'string', description: 'Director of the movie' }
                            },
                            required: ['title', 'description', 'releaseDate', 'director']
                        },
                        User: {
                            type: 'object',
                            properties: {
                                firstName: { type: 'string', example: 'John', minLength: 3, description: 'Firstname of the user' },
                                lastName: { type: 'string', example: 'Doe', minLength: 3, description: 'Lastname of the user' },
                                password: { type: 'string', example: 'password123', minLength: 8, description: 'Password of the user' },
                                mail: { type: 'string', example: 'john.doe@example.com', description: 'Email of the user' },
                                username: { type: 'string', example: 'johndoe', description: 'Username of the user' }
                            },
                            required: ['firstName', 'lastName', 'password', 'mail', 'username']
                        },
                        Logins: {
                            type: 'object',
                            properties: {
                                mail: { type: 'string', example: 'john.doe@example.com', description: 'Email of the user' },
                                password: { type: 'string', example: 'password123', minLength: 8, description: 'Password of the user' }
                            },
                            required: ['mail', 'password']
                        }
                    }
                }
            }
        ]);
    }
};