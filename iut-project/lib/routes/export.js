'use strict';

const Joi = require('joi');
const { Parser } = require('json2csv');
const amqp = require('amqplib');

module.exports = [
    {
        method: 'get',
        path: '/export/movies',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {
            const { movieService, mailService } = request.services();
            const movies = await movieService.list();
            const fields = ['id', 'title', 'description', 'releaseDate', 'director', 'createdAt', 'updatedAt'];
            const parser = new Parser({ fields });
            const csv = parser.parse(movies);

            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();
            const queue = 'movie_exports';
            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(csv));

            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    await mailService.sendMail(request.auth.credentials.mail, 'Movies Export', 'Here is the CSV export of movies.', [
                        { filename: 'movies.csv', content: msg.content }
                    ]);
                    channel.ack(msg);
                }
            });

            return h.response().code(202);
        }
    }
];