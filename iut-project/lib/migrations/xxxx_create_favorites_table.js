'use strict';

exports.up = async (knex) => {
    await knex.schema.createTable('favorites', (table) => {
        table.increments('id').primary();
        table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('movieId').notNullable().references('id').inTable('movies').onDelete('CASCADE');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('favorites');
};