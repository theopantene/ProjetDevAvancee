'use strict';

exports.up = async (knex) => {
    await knex.schema.table('users', (table) => {
        table.string('role').notNullable().defaultTo('user');
    });
};

exports.down = async (knex) => {
    await knex.schema.table('users', (table) => {
        table.dropColumn('role');
    });
};