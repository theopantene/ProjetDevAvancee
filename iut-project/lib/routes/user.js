'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(8).example('password123').description('Password of the user'),
                    mail: Joi.string().email().required().example('john.doe@example.com').description('Email of the user'),
                    username: Joi.string().required().example('johndoe').description('Username of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService, mailService } = request.services();
            const user = await userService.create(request.payload);
            await mailService.sendMail(user.mail, 'Welcome!', `Hello ${user.firstName}, welcome to our service!`);
            return user;
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const users = await userService.list();
            return users;
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            await userService.delete(request.params.id);
            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the user')
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().min(8).example('password123').description('Password of the user'),
                    mail: Joi.string().email().example('john.doe@example.com').description('Email of the user'),
                    username: Joi.string().example('johndoe').description('Username of the user')
                }).min(1)
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const updatedUser = await userService.update(request.params.id, request.payload);
            return updatedUser;
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    mail: Joi.string().email().required().example('john.doe@example.com').description('Email of the user'),
                    password: Joi.string().required().min(8).example('password123').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            const user = await userService.findByMail(request.payload.mail);
            if (user && await bcrypt.compare(request.payload.password, user.password)) {
                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.mail,
                        scope: user.role
                    },
                    {
                        key: 'random_string', // La clé qui est définie dans lib/auth/strategies/jwt.js
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );
                return { login: 'successful', token };
            }
            return h.response().code(401);
        }
    }
];