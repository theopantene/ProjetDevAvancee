'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/movie',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().description('Title of the movie'),
                    description: Joi.string().required().description('Description of the movie'),
                    releaseDate: Joi.date().required().description('Release date of the movie'),
                    director: Joi.string().required().description('Director of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const movie = await movieService.create(request.payload);
            return movie;
        }
    },
    {
        method: 'get',
        path: '/movies',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const movies = await movieService.list();
            return movies;
        }
    },
    {
        method: 'patch',
        path: '/movie/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the movie')
                }),
                payload: Joi.object({
                    title: Joi.string().description('Title of the movie'),
                    description: Joi.string().description('Description of the movie'),
                    releaseDate: Joi.date().description('Release date of the movie'),
                    director: Joi.string().description('Director of the movie')
                }).min(1)
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const movie = await movieService.update(request.params.id, request.payload);
            return movie;
        }
    },
    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            await movieService.delete(request.params.id);
            return '';
        }
    }
];