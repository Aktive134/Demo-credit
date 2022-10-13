import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', function (table) {
    table.increments('id').primary()
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('account_number').notNullable().unique()
    table.double('balance').notNullable()
    table.timestamps(false, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts')
}
