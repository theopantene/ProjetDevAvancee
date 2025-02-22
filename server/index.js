'use strict';

const Hapi = require('@hapi/hapi');
const Schmervice = require('@hapipal/schmervice');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const knex = Knex(knexConfig.development);
    Model.knex(knex);

    await server.register([
        Schmervice,
        require('../plugins/swagger')
    ]);

    server.registerService([
        require('./services/user'),
        require('./services/mail'),
        require('./services/movie'),
        require('./services/favorite')
    ]);

    server.route([
        ...require('./routes/user'),
        ...require('./routes/movie'),
        ...require('./routes/favorite'),
        ...require('./routes/export')
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();