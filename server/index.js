'use strict';

const Hapi = require('@hapi/hapi');
const Schmervice = require('@hapipal/schmervice');
const { Model } = require('objection');
const Knex = require('knex');
const Basic = require('@hapi/basic');
const Bcrypt = require('bcrypt');
// eslint-disable-next-line @hapi/hapi/capitalize-modules
const knexConfig = require('../knexfile');
const User = require('../lib/models/user'); // Assuming you have a User model

// eslint-disable-next-line @hapi/hapi/scope-start
const validate = async (request, username, password) => {
    try {
        const user = await User.query().findOne({ username });

        if (!user) {
            return { isValid: false, credentials: null };
        }

        const isValid = await Bcrypt.compare(password, user.password);

        if (!isValid) {
            return { isValid: false, credentials: null };
        }

        const credentials = { id: user.id, name: user.username };
        return { isValid: true, credentials };
    }
    catch (err) {
        console.error(err);
        return { isValid: false, credentials: null };
    }
};

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const knex = Knex(knexConfig.development);
    Model.knex(knex);

    await server.register([
        Schmervice,
        Basic,
        require('./plugins/swagger.js')
    ]);

    server.auth.strategy('simple', 'basic', { validate });
    server.auth.default('simple');

    server.registerService([
        require('../lib/services/user'),
        require('../lib/services/mail'),
        require('../lib/services/movie'),
        require('../lib/services/favorite')
    ]);

    server.route([
        ...require('../lib/routes/user'),
        ...require('../lib/routes/movie'),
        ...require('../lib/routes/favorite'),
        ...require('../lib/routes/export')
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// eslint-disable-next-line @hapi/hapi/scope-start
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
