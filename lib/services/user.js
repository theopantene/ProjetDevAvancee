'use strict';

const { Service } = require('@hapipal/schmervice');
const bcrypt = require('bcrypt');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        user.password = await bcrypt.hash(user.password, 10);
        return User.query().insertAndFetch(user);
    }

    list() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    async update(id, user) {
        const { User } = this.server.models();
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        return User.query().patchAndFetchById(id, user);
    }

    findByMail(mail) {
        const { User } = this.server.models();
        return User.query().findOne({ mail });
    }
}