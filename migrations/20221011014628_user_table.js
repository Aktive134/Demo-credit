"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('users');
}
exports.down = down;
