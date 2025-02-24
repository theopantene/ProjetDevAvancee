'use strict';

exports.up = async (knex) => {
    await knex.schema.table('users', (table) => {
        table.string('password').notNullable();
        table.string('mail').notNullable().unique();
        table.string('username').notNullable().unique();
    });
};

exports.down = async (knex) => {
    await knex.schema.table('users', (table) => {
        table.dropColumn('password');
        table.dropColumn('mail');
        table.dropColumn('username');
    });
};