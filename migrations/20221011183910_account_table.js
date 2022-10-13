"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('accounts', function (table) {
        table.increments('id').primary();
        table
            .uuid('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('account_number').notNullable().unique();
        table.double('balance').notNullable();
        table.timestamps(false, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('accounts');
}
exports.down = down;
