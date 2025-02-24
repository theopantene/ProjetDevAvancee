'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/favorite',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user']
            },
            validate: {
                payload: Joi.object({
                    movieId: Joi.number().integer().required().description('ID of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const userId = request.auth.credentials.id;
            const favorite = await favoriteService.add(userId, request.payload.movieId);
            return favorite;
        }
    },
    {
        method: 'delete',
        path: '/favorite/{movieId}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user']
            },
            validate: {
                params: Joi.object({
                    movieId: Joi.number().integer().required().description('ID of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const userId = request.auth.credentials.id;
            await favoriteService.remove(userId, request.params.movieId);
            return '';
        }
    }
];