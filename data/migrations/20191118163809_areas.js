exports.up = function(knex) {
  return knex.schema.createTable('areas', users => {

    users.increments();

    users
      .string('name', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('areas');
};