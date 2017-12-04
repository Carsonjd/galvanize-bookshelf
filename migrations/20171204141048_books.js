
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', table => {
    table.increments()
    table.string('title').notNullable().defaultTo('')
    table.string('author').notNullable().defaultTo('')
    table.string('genre').notNullable().defaultTo('')
    table.text('description', 500).notNullable().defaultTo('')
    table.text('cover_url', 500).notNullable().defaultTo('')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
};
